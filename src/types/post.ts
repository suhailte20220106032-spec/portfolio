export interface PostFrontmatter {
  title: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  published: boolean;
  excerpt?: string;
  tags?: string[];
}

export interface Post extends PostFrontmatter {
  content: string;
}

export interface AdminUser {
  username: string;
  passwordHash: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface JWTPayload {
  username: string;
  iat?: number;
  exp?: number;
}
