# 🚀 Blog CMS - Deployment Checklist

## Phase 1: Local Development Setup (Before Testing)

### Generate Secrets
- [ ] Generate bcrypt password hash:
  ```bash
  node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourPassword123', 10, (err, hash) => console.log(hash));"
  ```
  Save output: `ADMIN_PASSWORD_HASH`

- [ ] Generate JWT secret:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
  ```
  Save output: `JWT_SECRET`

- [ ] Create GitHub Personal Access Token:
  - Go to https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Name: "Portfolio Blog"
  - Scopes: Select `repo` (full control of private repositories)
  - Generate and copy token: `GITHUB_TOKEN`

### Create `.env.local` File

- [ ] Create file: `e:\portfolio\.env.local`
- [ ] Copy template from `.env.local.example`
- [ ] Fill in all 8 variables:
  ```env
  ADMIN_USER=admin
  ADMIN_PASSWORD_HASH=<your_bcrypt_hash>
  JWT_SECRET=<your_jwt_secret>
  JWT_EXPIRES_IN=7d
  GITHUB_TOKEN=<your_github_token>
  GITHUB_OWNER=suhailte20220106032-spec
  GITHUB_REPO=portfolio
  GITHUB_BRANCH=main
  ```

### Verify Files Exist

- [ ] `src/types/post.ts` - TypeScript types
- [ ] `src/lib/auth.ts` - Auth utilities
- [ ] `src/lib/posts.ts` - Markdown parsing
- [ ] `src/lib/github.ts` - GitHub API
- [ ] `src/app/components/BlogCard.tsx` - Blog card component
- [ ] `src/app/admin/login/page.tsx` - Login page
- [ ] `src/app/admin/page.tsx` - Dashboard
- [ ] `src/app/admin/edit/page.tsx` - Post editor
- [ ] `src/app/blog/page.tsx` - Blog listing
- [ ] `src/app/blog/[slug]/page.tsx` - Post detail
- [ ] `content/posts/welcome-to-my-blog.md` - Example post

## Phase 2: Local Testing (Run Locally First)

### Start Development Server
- [ ] Run: `npm run dev`
- [ ] Wait for "ready - started server on..." message
- [ ] Should see no errors in terminal

### Test Admin Login
- [ ] Visit: http://localhost:3000/admin/login
- [ ] Username: `admin`
- [ ] Password: (the one you hashed in phase 1)
- [ ] Click "Login"
- [ ] Should redirect to /admin dashboard
- [ ] Should see post list with example post

### Test Blog Listing
- [ ] Visit: http://localhost:3000/blog
- [ ] Should see blog cards
- [ ] Should show "Welcome to My Blog" post
- [ ] Click "Read more"
- [ ] Should navigate to /blog/welcome-to-my-blog

### Test Blog Post Detail
- [ ] Page should show full post content
- [ ] Post title visible
- [ ] Publication date visible
- [ ] Markdown rendering working
- [ ] "Back to Blog" button works

### Test Admin Dashboard
- [ ] Visit: http://localhost:3000/admin
- [ ] Should see table of posts
- [ ] Should show "Welcome to My Blog" post
- [ ] Edit button clickable
- [ ] Delete button clickable (don't actually delete)

### Test Create Post
- [ ] Click "Create New Post"
- [ ] Fill form:
  - Title: "Test Post"
  - Content: "# Test\nThis is a test post"
  - Excerpt: "Testing the system"
- [ ] Leave "Publish" checked
- [ ] Click "Save Post"
- [ ] Should redirect to /admin
- [ ] New post should appear in table

### Test New Post Displays
- [ ] Visit: http://localhost:3000/blog
- [ ] Should see "Test Post" card
- [ ] Click "Read more"
- [ ] Should show full post content

### Test Edit Post
- [ ] Go to /admin
- [ ] Click "Edit" on "Test Post"
- [ ] Change title to "Test Post Updated"
- [ ] Click "Save Post"
- [ ] Should redirect to /admin
- [ ] Updated title should appear in table

### Test Logout
- [ ] Click "Logout" button on /admin
- [ ] Should redirect to /admin/login
- [ ] Old admin pages inaccessible without login

## Phase 3: GitHub Push

### Commit Changes
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Add blog management system"`
- [ ] Run: `git push origin main`
- [ ] Wait for GitHub to receive push
- [ ] Verify on GitHub: https://github.com/suhailte20220106032-spec/portfolio

### Verify Files on GitHub
- [ ] All new files visible in GitHub repo
- [ ] `src/lib/`, `src/types/`, `src/app/admin/`, etc. exist
- [ ] `content/posts/welcome-to-my-blog.md` exists
- [ ] `.env.local` NOT in repo (should be in .gitignore)

## Phase 4: Vercel Deployment

### Add Environment Variables to Vercel
- [ ] Go to: https://vercel.com/dashboard
- [ ] Select project: "portfolio"
- [ ] Settings → Environment Variables
- [ ] Add 8 environment variables:
  - [ ] `ADMIN_USER` = `admin`
  - [ ] `ADMIN_PASSWORD_HASH` = (your hash)
  - [ ] `JWT_SECRET` = (your secret)
  - [ ] `JWT_EXPIRES_IN` = `7d`
  - [ ] `GITHUB_TOKEN` = (your token)
  - [ ] `GITHUB_OWNER` = `suhailte20220106032-spec`
  - [ ] `GITHUB_REPO` = `portfolio`
  - [ ] `GITHUB_BRANCH` = `main`
- [ ] Make sure all are set for "Production", "Preview", "Development"
- [ ] Save all variables

### Redeploy
- [ ] Go to Deployments tab
- [ ] Click "Redeploy" on latest deployment
- [ ] OR simply commit again to trigger auto-deploy
- [ ] Wait for build to complete
- [ ] Should see ✓ Deployed status

### Test on Production (Vercel URL)
- [ ] Visit: https://your-vercel-domain.vercel.app/admin/login
- [ ] Test login with same credentials
- [ ] Test blog: https://your-vercel-domain.vercel.app/blog
- [ ] Create a test post on production
- [ ] Verify it appears on blog page

### Test GitHub Integration
- [ ] Create post on production admin
- [ ] Check GitHub repo: `content/posts/` folder
- [ ] New post file should appear in repo
- [ ] File should have correct markdown format with frontmatter

## Phase 5: Production Verification

### Final Checks
- [ ] Admin login working at `/admin/login`
- [ ] Admin dashboard accessible after login
- [ ] Can create, edit, delete posts
- [ ] Posts appear on `/blog` page
- [ ] Blog cards showing correctly
- [ ] Individual post pages work
- [ ] Markdown rendering working
- [ ] Logout redirects to login
- [ ] Cannot access `/admin` without login
- [ ] GitHub posts persist between deployments

### Security Checks
- [ ] `.env.local` not in GitHub
- [ ] GitHub token is stored securely in Vercel
- [ ] Admin password is bcrypt hashed
- [ ] JWT tokens in HTTP-only cookies
- [ ] No console errors in browser
- [ ] No sensitive data in logs

## Phase 6: Cleanup & Documentation

### Local Cleanup
- [ ] Delete test post from GitHub (optional)
- [ ] Keep example "Welcome to My Blog" post
- [ ] Verify `.gitignore` includes `.env.local`

### Documentation
- [ ] Read `BLOG_SETUP.md` - has detailed instructions
- [ ] Read `IMPLEMENTATION_COMPLETE.md` - has quick start
- [ ] Read `ARCHITECTURE.md` - system design
- [ ] Keep these files in repo for reference

### Finalize
- [ ] Do final git push of any cleanup
- [ ] Share blog link with others
- [ ] Start writing blog posts!

## Troubleshooting During Testing

### Login Not Working
**Problem:** "Invalid credentials" error
- [ ] Verify username is exactly "admin"
- [ ] Check password against the one you hashed
- [ ] Verify `.env.local` has correct ADMIN_PASSWORD_HASH
- [ ] Try regenerating password hash

### Blog Posts Not Showing
**Problem:** Empty blog page
- [ ] Verify GITHUB_TOKEN is valid (hasn't expired)
- [ ] Check GITHUB_OWNER matches your username exactly
- [ ] Verify GITHUB_REPO = "portfolio"
- [ ] Confirm token has `repo` scope
- [ ] Check browser console for errors

### Build Fails on Vercel
**Problem:** Deployment failed
- [ ] Check Vercel build logs
- [ ] Verify all 8 env vars set correctly
- [ ] No `.env.local` file should be uploaded
- [ ] Try: delete `.next` folder, rebuild locally
- [ ] Check for TypeScript errors: `npm run build`

### Posts Not Persisting After Logout
**Problem:** Posts disappear
- [ ] Check browser cookies (admin tab)
- [ ] Should have `adminToken` cookie
- [ ] Cookie should be HTTP-only
- [ ] Try logging back in

### GitHub API Errors
**Problem:** Can't create/edit posts
- [ ] Verify token hasn't expired
- [ ] Generate new token if unsure
- [ ] Check token has correct scopes (repo)
- [ ] Test token in GitHub API explorer first

## Success Criteria

✅ **You're done when:**
- [ ] Can login to `/admin` locally
- [ ] Can create test post
- [ ] Test post appears on `/blog`
- [ ] Test post file appears in GitHub
- [ ] Deployed to Vercel successfully
- [ ] Can login to `/admin` on production URL
- [ ] Can create post on production
- [ ] Post appears on `/blog` on production
- [ ] Post file created in GitHub repo

## What's Next?

After successful deployment:

1. **Customize** - Update BlogCard styling to match your portfolio
2. **Enhance** - Add features like tags, comments, search
3. **Content** - Start writing blog posts!
4. **Analytics** - Add Google Analytics if desired
5. **SEO** - Add meta tags for blog posts

## Support Resources

- **Setup Guide**: `BLOG_SETUP.md` - Detailed instructions
- **Architecture**: `ARCHITECTURE.md` - System design and diagrams
- **Summary**: `IMPLEMENTATION_COMPLETE.md` - Feature overview
- **This File**: Deployment checklist with step-by-step instructions

---

**Questions?** Check the documentation files or review the code comments. Good luck! 🎉
