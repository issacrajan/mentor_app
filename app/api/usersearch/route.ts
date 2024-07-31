import { NextRequest, NextResponse } from 'next/server';
import { searchUser } from '@/backend/service/user/UserService';
import { UserSearchType } from '@/common/types/types';

//search user
export async function POST(req: NextRequest) {
	const payload = await req.json();
	console.log('search user', payload);
	const userSearch: UserSearchType = {
		userId: payload.userId,
		userName: payload.userName,
		userType: payload.userType,
	};
	const result = await searchUser(userSearch);
	return NextResponse.json({ result }, { status: 200 });
}
