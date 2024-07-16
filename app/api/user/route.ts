import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

//create user
export async function POST(req: NextRequest) {
  const payload = await req.json();
  console.log("payload", payload);
  const user = {
    loginId: payload.loginId,
    loginPwd: payload.loginPwd,
    userType: payload.userType,
    userName: payload.userName,
    userStatus: payload.userStatus,
  };
  const createdUser = await prisma.appUser.create({
    data: user,
  });

  return NextResponse.json({ user: createdUser }, { status: 200 });
}
