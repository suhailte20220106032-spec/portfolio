import { Octokit } from '@octokit/rest';
import { Post, PostFrontmatter } from '@/types/post';
import { parseMarkdown, stringifyPost } from './posts';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
  console.warn('GitHub environment variables not fully configured');
}

function getOctokit(): Octokit {
  return new Octokit({ auth: GITHUB_TOKEN });
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const octokit = getOctokit();
    const response = await octokit.repos.getContent({
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      path: `content/posts/${slug}.md`,
      ref: GITHUB_BRANCH,
    });

    if (Array.isArray(response.data) || response.data.type !== 'file') {
      return null;
    }

    const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
    const { frontmatter, content: body } = parseMarkdown(content);

    return { ...frontmatter, content: body };
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}

export async function listPosts(): Promise<Post[]> {
  try {
    const octokit = getOctokit();
    const response = await octokit.repos.getContent({
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      path: 'content/posts',
      ref: GITHUB_BRANCH,
    });

    if (!Array.isArray(response.data)) {
      return [];
    }

    const posts: Post[] = [];
    for (const file of response.data) {
      if (file.type === 'file' && file.name.endsWith('.md')) {
        const post = await getPost(file.name.replace('.md', ''));
        if (post) {
          posts.push(post);
        }
      }
    }

    // Sort by publishedAt descending
    posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return posts;
  } catch (error) {
    console.error('Error listing posts:', error);
    return [];
  }
}

export async function createPost(frontmatter: PostFrontmatter, content: string): Promise<{ post: Post; message: string }> {
  try {
    const octokit = getOctokit();
    const fileContent = stringifyPost(frontmatter, content);
    const path = `content/posts/${frontmatter.slug}.md`;

    const response = await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      path,
      message: `Create blog post: ${frontmatter.title}`,
      content: Buffer.from(fileContent).toString('base64'),
      branch: GITHUB_BRANCH,
    });

    const post = { ...frontmatter, content };
    return { post, message: 'Post created successfully' };
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error(`Failed to create post: ${error}`);
  }
}

export async function updatePost(slug: string, frontmatter: PostFrontmatter, content: string): Promise<{ post: Post; message: string }> {
  try {
    const octokit = getOctokit();
    const fileContent = stringifyPost(frontmatter, content);
    const path = `content/posts/${slug}.md`;

    // Get current file SHA for update
    const currentFile = await octokit.repos.getContent({
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      path,
      ref: GITHUB_BRANCH,
    });

    if (Array.isArray(currentFile.data) || currentFile.data.type !== 'file') {
      throw new Error('File not found or invalid');
    }

    await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      path,
      message: `Update blog post: ${frontmatter.title}`,
      content: Buffer.from(fileContent).toString('base64'),
      sha: currentFile.data.sha,
      branch: GITHUB_BRANCH,
    });

    const post = { ...frontmatter, content };
    return { post, message: 'Post updated successfully' };
  } catch (error) {
    console.error('Error updating post:', error);
    throw new Error(`Failed to update post: ${error}`);
  }
}

export async function deletePost(slug: string): Promise<{ message: string }> {
  try {
    const octokit = getOctokit();
    const path = `content/posts/${slug}.md`;

    const currentFile = await octokit.repos.getContent({
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      path,
      ref: GITHUB_BRANCH,
    });

    if (Array.isArray(currentFile.data) || currentFile.data.type !== 'file') {
      throw new Error('File not found or invalid');
    }

    await octokit.repos.deleteFile({
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      path,
      message: `Delete blog post: ${slug}`,
      sha: currentFile.data.sha,
      branch: GITHUB_BRANCH,
    });

    return { message: 'Post deleted successfully' };
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error(`Failed to delete post: ${error}`);
  }
}
