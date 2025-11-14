# Blog CMS Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     PORTFOLIO BLOG CMS                          │
└─────────────────────────────────────────────────────────────────┘

Public Routes                  Admin Routes                API Routes
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│ /blog            │      │ /admin/login     │      │ POST /login      │
│ List all posts   │      │ Authentication   │      │ Verify creds     │
│ + BlogCards      │      │                  │      │ Return JWT       │
└──────────────────┘      └──────────────────┘      └──────────────────┘
        │                          │                        │
        │                          │                        │
        │                  ┌───────▼────────┐               │
        │                  │ /admin         │               │
        │                  │ Dashboard      │       ┌───────▼─────────┐
        │                  │ Auth: JWT      │       │ POST /posts     │
        │                  │ + Post table   │       │ Create post     │
        │                  └────────────────┘       │ Auth: JWT       │
        │                          │                │ → GitHub commit │
        │              ┌───────────▼────────────┐   └─────────────────┘
        │              │ /admin/edit            │
        │              │ Create/Edit posts      │   ┌───────────────┐
        │              │ Auth: JWT              │   │ GET /posts    │
        │              │ Title, Slug, Content   │   │ List all      │
        │              └────────────────────────┘   │ No auth       │
        │                                           └───────────────┘
        │
        └──────────────┐                           ┌───────────────┐
                       │                           │ PUT /posts/:slug
                ┌──────▼──────┐                    │ Update post
                │ /blog/[slug] │                    │ Auth: JWT
                │ Post detail  │                    │ → GitHub update
                │ Full content │                    └───────────────┘
                │ Markdown     │
                └──────────────┘                    ┌───────────────┐
                                                    │ DEL /posts/:slug
                                                    │ Delete post
                                                    │ Auth: JWT
                                                    │ → GitHub delete
                                                    └───────────────┘
```

## Authentication Flow

```
User visits /admin/login
        │
        └─► Submits username + password
             │
             └─► POST /api/admin/login
                  │
                  ├─► Compare username with ADMIN_USER
                  ├─► Hash password with ADMIN_PASSWORD_HASH
                  │
                  ├─ MATCH ─► Generate JWT token
                  │           │
                  │           └─► Set HTTP-only cookie
                  │               response.cookies.set('adminToken', token)
                  │
                  └─ FAIL  ─► Return 401 Unauthorized
                             
User visits /admin dashboard
        │
        └─► Extract JWT from cookie
            │
            └─► verifyJWT(token)
                │
                ├─ VALID  ─► Load dashboard
                │           └─► Fetch posts with GET /api/admin/posts
                │
                └─ INVALID ─► Redirect to /admin/login
```

## Data Flow: Create Post

```
Admin fills editor form
  title: "My Post"
  slug: "my-post"  
  content: "# Hello World..."
  published: true

        │
        └─► Click "Save Post"
            │
            └─► POST /api/admin/posts
                {
                  title: "My Post",
                  content: "# Hello World...",
                  slug: "my-post",
                  published: true
                }
                │
                ├─► Check isAuthenticated(request)
                │   ├─ Extract JWT from cookie
                │   └─ Verify JWT token
                │
                ├─ AUTH VALID ─► Call github.createPost()
                │                │
                │                ├─► Initialize Octokit client
                │                │   (auth: GITHUB_TOKEN)
                │                │
                │                ├─► Create markdown file:
                │                │   ---
                │                │   title: My Post
                │                │   slug: my-post
                │                │   published: true
                │                │   ---
                │                │   # Hello World...
                │                │
                │                ├─► Call octokit.repos.createOrUpdateFileContents()
                │                │   path: "content/posts/my-post.md"
                │                │   message: "Create blog post: My Post"
                │                │
                │                └─► Commit to GitHub repo
                │
                └─► Return { success: true, post: {...} }
                    │
                    └─► Frontend redirects to /admin
                        POST list updates (posts now include new post)
```

## Data Flow: Read Posts (Public)

```
User visits /blog
        │
        └─► blog/page.tsx mounts (useEffect)
            │
            └─► GET /api/admin/posts
                {
                  "posts": [
                    {
                      title: "My Post",
                      slug: "my-post",
                      content: "...",
                      excerpt: "...",
                      publishedAt: "2025-11-14T...",
                      published: true
                    }
                  ]
                }
                │
                ├─► Filter: published === true only
                │
                ├─► For each post:
                │   └─► <BlogCard post={post} link="/blog/my-post" />
                │       ├─ Shows title
                │       ├─ Shows excerpt
                │       ├─ Shows date
                │       └─ Shows "Read more" link
                │
                └─► Render grid of BlogCards
                    
User clicks "Read more" on a card
        │
        └─► Navigate to /blog/my-post
            │
            └─► blog/[slug]/page.tsx mounts
                │
                └─► GET /api/admin/posts/my-post
                    │
                    ├─► Call github.getPost('my-post')
                    │   │
                    │   ├─► Initialize Octokit
                    │   ├─► Fetch raw file from GitHub
                    │   ├─► Parse frontmatter
                    │   ├─► Extract content
                    │   └─► Return full Post object
                    │
                    └─► Render post
                        ├─ Display title
                        ├─ Display date
                        ├─ Render markdown as HTML
                        └─ Show "Back to blog" link
```

## File Structure & Relationships

```
src/app/
├── blog/
│   ├── page.tsx ──────────────────────┐
│   │   Calls: GET /api/admin/posts    │
│   │   Renders: BlogCard components   │
│   │                                  │
│   └── [slug]/
│       └── page.tsx ───────────────┐  │
│           Calls: GET /api/admin/posts/[slug]
│           Renders: Full post + markdown
│                                      │
├── admin/                             │
│   ├── login/                         │
│   │   └── page.tsx                   │
│   │       Calls: POST /api/admin/login
│   │       Sets: adminToken cookie    │
│   │                                  │
│   ├── page.tsx ───────────────────┐  │
│   │   Calls: GET /api/admin/posts  │  │
│   │   Renders: PostList            │  │
│   │   Protected: isAuthenticated()  │  │
│   │                                 │  │
│   ├── edit/                         │  │
│   │   └── page.tsx                  │  │
│   │       Calls: POST/PUT /api/admin/posts
│   │       Protected: isAuthenticated()
│   │                                 │  │
│   └── components/                   │  │
│       └── PostList.tsx              │  │
│           Displays posts table       │  │
│                                     │  │
├── components/                        │  │
│   └── BlogCard.tsx ◄────────────────┘  │
│       Reusable post card component      │
│       Props: post, link                 │
│                                        │
└── api/admin/                          │
    ├── login/route.ts                  │
    │   POST: Authenticate + JWT        │
    │   Uses: verifyPassword, signJWT   │
    │                                   │
    ├── logout/route.ts                 │
    │   POST: Clear cookie              │
    │                                   │
    ├── posts/route.ts                  │
    │   GET: List posts                 │
    │   POST: Create post (auth req'd)  │
    │   Uses: listPosts, createPost     │
    │                                   │
    └── posts/[slug]/route.ts           │
        GET: Get single post ◄──────────┘
        PUT: Update post (auth req'd)
        DELETE: Delete post (auth req'd)
        Uses: getPost, updatePost, deletePost
```

## Library Dependencies

```
jsonwebtoken
├─ signJWT()       → Generate JWT tokens
├─ verifyJWT()     → Validate JWT tokens
└─ Used in auth.ts

bcryptjs
├─ verifyPassword() → Compare plaintext vs hash
└─ Used in auth.ts

gray-matter
├─ parseMarkdown()  → Extract YAML frontmatter
└─ Used in posts.ts

slugify
├─ generateSlug()   → Create URL-friendly slugs
└─ Used in posts.ts

@octokit/rest
├─ getPost()       → Fetch post from GitHub
├─ listPosts()     → List all posts
├─ createPost()    → Commit new post
├─ updatePost()    → Update existing post
└─ deletePost()    → Delete post
   Used in github.ts
```

## Security Layers

```
┌─────────────────────────────────────────────────┐
│          ADMIN OPERATIONS (Requires Auth)       │
├─────────────────────────────────────────────────┤
│                                                 │
│  POST /api/admin/posts (create)                │
│  ├─ Check: isAuthenticated(request)            │
│  │   ├─ Extract cookie: 'adminToken'           │
│  │   ├─ Parse JWT: verifyJWT(token)            │
│  │   └─ Verify signature: JWT_SECRET           │
│  └─ If valid: execute                          │
│     If invalid: return 401                     │
│                                                 │
│  PUT /api/admin/posts/[slug] (update)          │
│  ├─ Same auth check as above                   │
│  └─ If valid: execute                          │
│     If invalid: return 401                     │
│                                                 │
│  DELETE /api/admin/posts/[slug] (delete)       │
│  ├─ Same auth check as above                   │
│  └─ If valid: execute                          │
│     If invalid: return 401                     │
│                                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│       PUBLIC OPERATIONS (No Auth)               │
├─────────────────────────────────────────────────┤
│                                                 │
│  GET /api/admin/posts (list)                   │
│  └─ Returns only published posts                │
│                                                 │
│  GET /api/admin/posts/[slug] (read)            │
│  └─ Returns post content                       │
│     (checks published flag)                    │
│                                                 │
│  /blog (view posts)                            │
│  └─ Public page, renders BlogCards             │
│                                                 │
│  /blog/[slug] (view post)                      │
│  └─ Public page, renders full content          │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Environment Variable Usage

```
.env.local (NOT in git)
├── ADMIN_USER ──────────────────► compare in POST /login
├── ADMIN_PASSWORD_HASH ─────────► hash compare in POST /login
├── JWT_SECRET ──────────────────► sign/verify JWT tokens
├── JWT_EXPIRES_IN ──────────────► token expiration time
├── GITHUB_TOKEN ────────────────► Octokit authentication
├── GITHUB_OWNER ────────────────► repo owner username
├── GITHUB_REPO ─────────────────► repo name
└── GITHUB_BRANCH ───────────────► branch for posts (main)
```

## GitHub Storage Structure

```
Your GitHub Repository
└── content/
    └── posts/
        ├── welcome-to-my-blog.md
        │   ---
        │   title: Welcome to My Blog
        │   slug: welcome-to-my-blog
        │   publishedAt: 2025-11-14T...
        │   updatedAt: 2025-11-14T...
        │   published: true
        │   excerpt: ...
        │   ---
        │   # Content here...
        │
        ├── another-post.md
        │   (same format)
        │
        └── draft-post.md
            published: false
            (won't show in public blog)
```

## Request/Response Examples

### POST /api/admin/login

**Request:**
```json
{
  "username": "admin",
  "password": "MyPassword123"
}
```

**Response (success):**
```
Status: 200
Headers: Set-Cookie: adminToken=<jwt_token>; HttpOnly; Path=/; ...
Body: { "success": true, "message": "Login successful" }
```

**Response (failure):**
```
Status: 401
Body: { "error": "Invalid credentials" }
```

### GET /api/admin/posts

**Response:**
```json
{
  "posts": [
    {
      "title": "My Post",
      "slug": "my-post",
      "content": "# Hello\nThis is content",
      "excerpt": "Short description",
      "publishedAt": "2025-11-14T10:00:00Z",
      "updatedAt": "2025-11-14T10:00:00Z",
      "published": true,
      "tags": []
    }
  ]
}
```

### POST /api/admin/posts

**Request (with auth cookie):**
```json
{
  "title": "New Post",
  "content": "# Hello World\n\nContent here",
  "excerpt": "Short desc",
  "published": true
}
```

**Response:**
```json
{
  "post": { /* full post object */ },
  "message": "Post created successfully"
}
```

---

This architecture provides a secure, scalable blog CMS using:
- Next.js serverless functions
- GitHub as the database
- JWT for authentication
- TypeScript for type safety
