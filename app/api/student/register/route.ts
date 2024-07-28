import { NextRequest, NextResponse } from 'next/server';
import {
	createStudent,
	readStudent,
} from '@/backend/service/registration/StudentRegService';
import { logger } from '@/logger';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
	const id = req.nextUrl.searchParams.get('id');
	logger.info(`reading student registation id:${id}`);
	if (!id) {
		return NextResponse.json({ message: 'ID is missing' }, { status: 417 });
	}

	try {
		const studentDetails = await readStudent({ id });

		console.log('studentDetails', studentDetails);
		return NextResponse.json({ ...studentDetails }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: `error in fetching student ${error}` },
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest) {
	const payload = await req.json();
	console.log('student register : payload', payload);
	const loginUseId = payload.loginId;

	try {
		const studentCreated = await createStudent({
			student: payload.student,
			studentParent: payload.parent,
			studentGuardian: payload.guardian,
		});

		console.log('studentCreated', studentCreated);
		return NextResponse.json({ ...studentCreated }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: `error in registering student ${error}` },
			{ status: 500 },
		);
	}
}
