import { db } from '@/backend/db/db';
import { AppUser } from '@/backend/db/schema';
import { eq, and, sql } from 'drizzle-orm';

export const login = async ({
  userId,
  userPwd,
}: {
  userId: string;
  userPwd: string;
}) => {
  return await db
    .select()
    .from(AppUser)
    .where(and(eq(AppUser.userId, userId), eq(AppUser.userPwd, userPwd)));
};
