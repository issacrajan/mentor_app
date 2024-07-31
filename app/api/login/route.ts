import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/backend/service/auth/LoginService';
export async function POST(req: NextRequest) {
	const payload = await req.json();
	console.log('login : payload', payload);
	const loginUseId = payload.loginId;

	try {
		const user = await login({
			userId: payload.loginId,
			userPwd: payload.loginPwd,
		});

		if (user && user.length > 0) {
			console.log('user', user[0]);
			return NextResponse.json({ user: user[0] }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: `login user ${loginUseId} not found` },
				{ status: 404 },
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ message: `error in loging ${loginUseId} : ${error}` },
			{ status: 500 },
		);
	}
}
