import { db } from '@/backend/db/db';
import { AppUser } from '@/backend/db/schema';
import { isValid } from '@/backend/utils';

import { AppUserType, UserSearchType } from '@/common/types/types';
import { and, eq, like, or } from 'drizzle-orm';

//create user
export const createUser = async (user: AppUserType) => {
	return await db.insert(AppUser).values(user).returning();
};

//update user
export const updateUser = async (user: AppUserType) => {
	const id = user.id;
	if (!id) {
		throw new Error('User id is missing');
	}

	const whereClause = eq(AppUser.id, id);
	const dbUser = await db.select().from(AppUser).where(whereClause);

	if (!dbUser) {
		throw new Error(`User record not found with id ${id}`);
	}
	const updateCols: AppUserType = {};
	updateCols.firstName = user.firstName;

	return await db
		.update(AppUser)
		.set(updateCols)
		.where(whereClause)
		.returning();
};

//read one user record
export const readUser = async ({ id }: { id: string }) => {
	if (!id) {
		throw new Error('User id is missing');
	}
	const result = await db.select().from(AppUser).where(eq(AppUser.id, id));
	return result.length > 0 ? result[0] : undefined;
};

//search user
export const searchUser = async (userSearch: UserSearchType) => {
	const condition = anySearchCriteriaPresent(userSearch)
		? and(
				isValid(userSearch.userId)
					? like(AppUser.userId, userSearch.userId || '')
					: undefined,
				isValid(userSearch.userName)
					? or(
							like(AppUser.lastName, userSearch.userName || ''),
							like(AppUser.lastName, userSearch.userName || ''),
						)
					: undefined,
				isValid(userSearch.userType)
					? eq(AppUser.userType, userSearch.userType || '')
					: undefined,
			)
		: undefined;
	const result = await db.select().from(AppUser).where(condition);

	return result;
};

const anySearchCriteriaPresent = (s: UserSearchType) => {
	return s.userId || s.userName || s.userType;
};
