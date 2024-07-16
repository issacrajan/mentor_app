import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  console.log("login : payload", payload);
  const loginUseId = payload.loginId;
  const user = await prisma.appUser.findFirst({
    where: {
      loginId: loginUseId,
      loginPwd: payload.loginPwd,
    },
  });
  if (user) {
    console.log("user", user);
    return NextResponse.json({ user }, { status: 200 });
  }
  return NextResponse.json(
    { message: `login user ${loginUseId} not found` },
    { status: 404 }
  );
}
