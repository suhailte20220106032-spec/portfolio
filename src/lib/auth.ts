import jwt, { SignOptions } from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { JWTPayload } from '@/types/post';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcryptjs.compare(password, hash);
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}

export function signJWT(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as JWTPayload;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
  } catch (error) {
    console.error('Password hashing error:', error);
    throw error;
  }
}

export function extractTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').map((c) => c.trim());
  const authCookie = cookies.find((c) => c.startsWith('adminToken='));
  
  if (!authCookie) return null;
  return authCookie.substring('adminToken='.length);
}

export function isAuthenticated(request: Request): boolean {
  const token = extractTokenFromRequest(request);
  if (!token) return false;
  
  const payload = verifyJWT(token);
  return payload !== null;
}
