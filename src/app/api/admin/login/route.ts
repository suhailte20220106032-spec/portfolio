import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, signJWT } from '@/lib/auth';
import { LoginRequest } from '@/types/post';

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { username, password } = body;

    // Validate credentials
    if (username !== ADMIN_USER) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (!ADMIN_PASSWORD_HASH) {
      return NextResponse.json({ error: 'Admin password not configured' }, { status: 500 });
    }

    const passwordMatch = await verifyPassword(password, ADMIN_PASSWORD_HASH);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT token
    const token = signJWT({ username });

    // Create response with HTTP-only cookie
    const response = NextResponse.json({ success: true, message: 'Login successful' });
    response.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
