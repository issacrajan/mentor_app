import { NextRequest, NextResponse } from 'next/server';
import {
	createUser,
	readUser,
	updateUser,
} from '@/backend/service/user/UserService';
import { logger } from '@/logger';
import { AppUserType } from '@/common/types/types';
import { AppError, buildErrResp, INVALID_INPUT } from '@/backend/utils';
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
		if (userDtl) {
			return NextResponse.json({ rec: { ...userDtl } }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: `user not found with id${id}` },
				{ status: 404 },
			);
		}
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

	if (Object.keys(err).length > 0) {
		return NextResponse.json({ error: err }, { status: INVALID_INPUT });
	}

	try {
		const createdUser = createUser(user);
		return NextResponse.json({ user: createdUser }, { status: 200 });
	} catch (error) {
		return buildErrResp(error, 'Error occured in user creation');
	}
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
	try {
		const updated = updateUser(user);
		return NextResponse.json({ user: updated }, { status: 200 });
	} catch (error) {
		return buildErrResp(error, 'Error occured in user update');
	}
}
