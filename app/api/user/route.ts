import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/backend/service/user/UserService';

//create user
export async function POST(req: NextRequest) {
  const payload = await req.json();
  console.log('payload', payload);
  const user = {
    loginId: payload.loginId,
    loginPwd: payload.loginPwd,
    userType: payload.userType,
    userName: payload.userName,
    userStatus: payload.userStatus,
  };
  const createdUser = createUser(user);

  return NextResponse.json({ user: createdUser }, { status: 200 });
}
