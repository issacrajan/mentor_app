import { AppUserType, UserSearchType, UserType } from '@/common/types/types';
import { db } from '@/backend/db/db';
import { AppUser } from '@/backend/db/schema';
import { and, eq, like, or } from 'drizzle-orm';

const isValidSearch = (s: UserSearchType) => {
	return s.userId || s.userName || s.userType;
};
const isValid = (s: string | undefined) => {
	return s && s.trim().length > 0;
};

export const readUser = async ({ id }: { id: string }) => {
	return await db.select().from(AppUser).where(eq(AppUser.id, id));
};

export const searchUser = async (userSearch: UserSearchType) => {
	const condition = isValidSearch(userSearch)
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

export const createUser = async (user: AppUserType) => {
	return await db.insert(AppUser).values(user).returning();
};

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
