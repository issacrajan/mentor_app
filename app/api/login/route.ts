import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/backend/service/login';
export async function POST(req: NextRequest) {
  const payload = await req.json();
  console.log('login : payload', payload);
  const loginUseId = payload.loginId;

  const user = await login({
    userId: payload.loginId,
    userPwd: payload.loginPwd,
  });

  if (user && user.length > 0) {
    console.log('user', user[0]);
    return NextResponse.json({ user: user[0] }, { status: 200 });
  }
  return NextResponse.json(
    { message: `login user ${loginUseId} not found` },
    { status: 404 },
  );
}
