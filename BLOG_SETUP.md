# Blog Management System Setup Guide

## Overview

Your portfolio now has a complete blog management system with:

- ✅ Admin login with JWT authentication
- ✅ Create, edit, and delete blog posts
- ✅ GitHub integration for storing posts
- ✅ BlogCard component for displaying posts
- ✅ Dynamic blog post pages with markdown rendering
- ✅ Public blog listing page

## Quick Setup

### 1. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install jsonwebtoken bcryptjs gray-matter slugify @octokit/rest @types/jsonwebtoken
```

### 2. Generate Secrets

#### Create a bcrypt hash for your admin password:

```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your_password_here', 10, (err, hash) => console.log(hash));"
```

Replace `your_password_here` with your desired admin password. Copy the output hash.

#### Generate a JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```

Copy the output.

### 3. Create GitHub Personal Access Token

1. Go to [GitHub Settings → Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select the `repo` scope (full control of private repositories)
4. Generate and copy the token

### 4. Configure Environment Variables

Create a `.env.local` file in the project root (copy from `.env.local.example`):

```env
ADMIN_USER=admin
ADMIN_PASSWORD_HASH=<paste_your_bcrypt_hash_here>
JWT_SECRET=<paste_your_jwt_secret_here>
JWT_EXPIRES_IN=7d

GITHUB_TOKEN=<paste_your_github_token_here>
GITHUB_OWNER=<your_github_username>
GITHUB_REPO=portfolio
GITHUB_BRANCH=main
```

### 5. Configure Vercel Environment Variables

When deploying to Vercel:

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add all variables from your `.env.local` file
4. Make sure they're available in Production, Preview, and Development environments

## Directory Structure

```
src/
├── app/
│   ├── admin/              # Admin dashboard
│   │   ├── login/
│   │   ├── edit/
│   │   └── components/
│   ├── api/
│   │   └── admin/
│   │       ├── login/
│   │       ├── logout/
│   │       └── posts/
│   ├── blog/               # Public blog pages
│   │   ├── page.tsx        # Blog listing
│   │   └── [slug]/         # Dynamic post detail
│   └── components/
│       └── BlogCard.tsx    # Reusable blog card component
├── lib/
│   ├── auth.ts            # JWT and password utilities
│   ├── posts.ts           # Markdown parsing utilities
│   └── github.ts          # GitHub API integration
└── types/
    └── post.ts            # TypeScript interfaces

content/
└── posts/                 # Markdown blog posts
    └── welcome-to-my-blog.md
```

## File Locations

### Public Routes

- **Blog listing**: `/blog` - View all published blog posts
- **Blog post detail**: `/blog/[slug]` - View individual post (dynamic routing)

### Admin Routes

- **Login**: `/admin/login` - Admin login page
- **Dashboard**: `/admin` - View and manage posts (protected)
- **Edit post**: `/admin/edit?slug=[slug]` - Edit existing or create new post (protected)

### API Routes

- `POST /api/admin/login` - Authenticate admin
- `POST /api/admin/logout` - Logout admin
- `GET /api/admin/posts` - List all posts
- `POST /api/admin/posts` - Create new post (protected)
- `GET /api/admin/posts/[slug]` - Get single post
- `PUT /api/admin/posts/[slug]` - Update post (protected)
- `DELETE /api/admin/posts/[slug]` - Delete post (protected)

## Features

### BlogCard Component

Located at `src/app/components/BlogCard.tsx`

```tsx
<BlogCard post={post} link="/blog/post-slug" />
```

Displays:
- Post title
- Excerpt (or first 150 characters of content)
- Publication date
- "Read more" link

### Admin Features

#### Create Post

1. Click "Create New Post" on the dashboard
2. Fill in title, content (markdown), and excerpt
3. Slug auto-generates from title but can be customized
4. Toggle "Publish" checkbox to make it public
5. Click "Save Post"

#### Edit Post

1. Click "Edit" button on any post in the dashboard
2. Modify content as needed
3. Click "Save Post"

#### Delete Post

1. Click "Delete" button on any post in the dashboard
2. Confirm deletion
3. Post is removed from GitHub repository

### Public Blog Features

- **Blog listing page** (`/blog`): Shows all published posts with cards
- **Individual post pages** (`/blog/[slug]`): Display full post content with markdown rendering
- **Dynamic routing**: Each post gets its own URL based on slug

## Writing Blog Posts

### Using the Admin Panel

1. Navigate to `/admin` (login first at `/admin/login`)
2. Click "Create New Post"
3. Fill in the form:
   - **Title**: Your post title
   - **Slug**: URL-friendly identifier (auto-generated from title)
   - **Excerpt**: Short summary for the blog list
   - **Content**: Full post in markdown format
   - **Publish**: Toggle to make it public

### Direct GitHub Method (Advanced)

Create a markdown file in `content/posts/` with the following format:

```markdown
---
title: Your Post Title
slug: your-post-slug
publishedAt: 2025-11-14T10:00:00Z
updatedAt: 2025-11-14T10:00:00Z
published: true
excerpt: Short description
tags: [tag1, tag2]
---

# Your Post Title

Content in markdown...
```

## Markdown Support

The blog supports standard markdown:

- `# Heading 1`, `## Heading 2`, `### Heading 3`
- `**bold text**` or `__bold text__`
- `*italic text*` or `_italic text_`
- Lists with `-` or `*`
- Links: `[text](url)`
- And more!

## Troubleshooting

### "Invalid credentials" error

- Ensure `ADMIN_USER` and `ADMIN_PASSWORD_HASH` are set correctly in `.env.local`
- Verify the password hash was generated with bcryptjs correctly

### GitHub connection errors

- Verify `GITHUB_TOKEN`, `GITHUB_OWNER`, and `GITHUB_REPO` are set correctly
- Check that the GitHub token has `repo` scope
- Ensure the repository exists and is accessible

### Blog posts not showing

- Verify posts have `published: true` in frontmatter
- Check that post files are in `content/posts/` directory
- Ensure GitHub token is valid and has repository access

## Security Notes

- ⚠️ Never commit `.env.local` to Git (it's in `.gitignore`)
- ⚠️ Use a strong admin password (at least 12 characters)
- ⚠️ Rotate your GitHub token periodically
- ⚠️ Keep your JWT secret secure
- ✅ Admin routes use HTTP-only cookies for JWT tokens
- ✅ All admin operations require authentication

## Next Steps

1. Set up environment variables as described above
2. Test admin login at `/admin/login`
3. Create your first blog post
4. Customize the BlogCard component styling if needed
5. Consider adding more features (comments, tags filtering, etc.)

## Support

If you encounter any issues:

1. Check that all environment variables are set correctly
2. Verify your GitHub token hasn't expired
3. Ensure your repository is accessible
4. Check the browser console for error messages
5. Review the `.env.local.example` file for the correct variable names
