import { UserType } from '@/common/types/types';
import { db } from '@/backend/db/db';
import { AppUser } from '@/backend/db/schema';

export const createUser = async (user: UserType) => {
  return await db.insert(AppUser).values(user).returning();
};
