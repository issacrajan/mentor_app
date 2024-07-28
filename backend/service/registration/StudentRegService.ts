import { db } from '@/backend/db/db';

import {
	StudentGuardianInfo,
	StudentInfo,
	StudentParentInfo,
	user,
} from '@/backend/db/schema';

import {
	AppUserType,
	StudentGuardianType,
	StudentInfoType,
	StudentParentType,
} from '@/common/types/types';
import { eq } from 'drizzle-orm';

import { createUser } from '@/backend/service/user/UserService';

export const readStudent = async ({ id }: { id: string }) => {
	const studentRec = await db
		.select()
		.from(StudentInfo)
		.where(eq(StudentInfo.id, id));

	const ret = {
		student: {
			...studentRec[0],
		},
		parent: {},
		guardian: {},
	};

	const studentParentRec = await db
		.select()
		.from(StudentParentInfo)
		.where(eq(StudentParentInfo.studentRecordId, id));

	if (studentParentRec && studentParentRec.length > 0) {
		ret.parent = { ...studentParentRec[0] };
	}

	const studentGuardianRec = await db
		.select()
		.from(StudentGuardianInfo)
		.where(eq(StudentGuardianInfo.studentRecordId, id));

	if (studentGuardianRec && studentGuardianRec.length > 0) {
		ret.guardian = { ...studentGuardianRec[0] };
	}

	return ret;
};

export const createStudent = async ({
	student,
	studentParent,
	studentGuardian,
}: {
	student: StudentInfoType & { userPwd: string };
	studentParent: StudentParentType;
	studentGuardian: StudentGuardianType;
}) => {
	try {
		const studentCreated = await db
			.insert(StudentInfo)
			.values(student)
			.returning();

		const studentInfo = studentCreated[0];
		const userInfo: AppUserType = {
			userId: studentInfo.userId,
			firstName: studentInfo.fullName,
			lastName: studentInfo.fullName,
			userPwd: student.userPwd,
			userType: 'Student',
			userRole: 'Student',
		};

		createUser(userInfo);

		const ret = {
			student: {
				...studentCreated[0],
			},
			parent: {},
			guardian: {},
		};

		const id = studentCreated[0].id;
		studentParent.studentRecordId = id;
		const studentParentCreated = await db
			.insert(StudentParentInfo)
			.values(studentParent)
			.returning();

		ret.parent = { ...studentParentCreated[0] };

		if (studentGuardian) {
			studentGuardian.studentRecordId = id;
			const studentGuardianCreated = await db
				.insert(StudentGuardianInfo)
				.values(studentGuardian)
				.returning();

			ret.guardian = { ...studentGuardianCreated[0] };
		}

		return ret;
	} catch (error) {
		console.log(error);
		throw new Error(`error in creating student: ${error}`);
	}
};
