import {
	AppUser,
	StudentGuardianInfo,
	StudentInfo,
	StudentParentInfo,
} from '@/backend/db/schema';
import { AdmissionCategory, Gender, StudentAccommodation } from '../enums';

export type UserInfoType = {
	userId?: string;
	userName?: string;
	roleName?: string;
	userEmail?: string;
	homePath?: string;
};

export type GlobalContent = {
	user: UserInfoType;
	setUser: (c: UserInfoType) => void;
};

export type UserType = {
	loginId?: string;
	loginPwd?: string;
	userType?: string;
	userName?: string;
	userStatus?: string;
};

export type UserSearchType = {
	userId?: string;
	userName?: string;
	userType?: string;
};

export type AppUserType = typeof AppUser.$inferInsert;

export type StudentInfoType = typeof StudentInfo.$inferInsert;

export type StudentParentType = typeof StudentParentInfo.$inferInsert;

export type StudentGuardianType = typeof StudentGuardianInfo.$inferInsert;

export type StudentDetailType = {
	student: StudentInfoType;
	parent: StudentParentType;
	guardian: StudentGuardianType;
};
