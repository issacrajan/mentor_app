import { NextRequest, NextResponse } from 'next/server';
import { createUser, readUser } from '@/backend/service/user/UserService';
import { logger } from '@/logger';
import { AppUserType } from '@/common/types/types';
export const dynamic = 'force-dynamic';
//read user

export async function GET(req: NextRequest) {
	const id = req.nextUrl.searchParams.get('id');
	logger.info(`reading user id:${id}`);
	if (!id) {
		return NextResponse.json({ message: 'ID is missing' }, { status: 417 });
	}

	try {
		const userDtl = await readUser({ id });

		console.log('userDtl', userDtl);
		return NextResponse.json({ ...userDtl[0] }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: `error in fetching user ${error}` },
			{ status: 500 },
		);
	}
}

//create user
export async function POST(req: NextRequest) {
	const payload = await req.json();
	console.log('payload', payload);
	const user = { ...payload };
	console.log('create user', user);
	const err: AppUserType = {};
	if (!user.userId) {
		err.userId = 'user id is required';
	}
	if (!user.userPwd) {
		err.userPwd = 'password is required';
	}
	const createdUser = createUser(user);

	return NextResponse.json({ user: createdUser }, { status: 200 });
}

//update some columns in user
export async function PATCH(req: NextRequest) {
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
