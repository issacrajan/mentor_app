import { AppUserType, UserSearchType, UserType } from '@/common/types/types';
import { db } from '@/backend/db/db';
import { AppUser } from '@/backend/db/schema';
import { and, eq, like, or } from 'drizzle-orm';

import * as UserRepo from '@/backend/repo/system/UserRepo';

export const readUser = ({ id }: { id: string }) => {
	return UserRepo.readUser({ id });
};

export const searchUser = (userSearchCriteria: UserSearchType) => {
	return UserRepo.searchUser(userSearchCriteria);
};

export const createUser = (user: AppUserType) => {
	return UserRepo.createUser(user);
};

export const updateUser = (user: AppUserType) => {
	return UserRepo.updateUser(user);
};

export const changePwd = async ({
	id,
	userPwd,
	userConfirmPwd,
}: {
	id?: string;
	userPwd?: string;
	userConfirmPwd?: string;
}) => {
	if (!id) {
		throw new Error('User Id is missing');
	}
	if (!userPwd) {
		throw new Error('User new password is required');
	}
	if (!userConfirmPwd) {
		throw new Error('User new conform password is required');
	}
	if (userPwd !== userConfirmPwd) {
		throw new Error('User new password and conform password not matching');
	}

	const userRec: AppUserType | undefined = await UserRepo.readUser({ id });
	if (!userRec) {
		throw new Error(`User record not found for id ${id}`);
	}
	if (userPwd === userRec.userPwd) {
		throw new Error('invalid User new password. please try another password.');
	}
	const updateMe = { id, userPwd };
	return UserRepo.updateUser(updateMe);
};
