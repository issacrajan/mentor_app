import { AppUserType, UserType } from '@/common/types/types';
import { db } from '@/backend/db/db';
import { AppUser } from '@/backend/db/schema';
import { eq } from 'drizzle-orm';

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
