import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
const alg = 'HS256';

export async function createSessionToken(userId: number) {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg })
    .setExpirationTime('7d')
    .sign(secretKey);
}


export async function verifySession(name: string = 'cult_session') {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get(name)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, secretKey);
    return { userId: payload.userId as number };
  } catch (error) {
    console.error('Admin session verification error:', error);
    return null;
  }
}

