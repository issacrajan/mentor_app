import { sql } from 'drizzle-orm';
import { varchar } from 'drizzle-orm/pg-core';
import {
  serial,
  text,
  timestamp,
  pgTable,
  uniqueIndex,
  primaryKey,
  uuid,
} from 'drizzle-orm/pg-core';

export const user = pgTable(
  'test_users',
  {
    id: uuid('id').defaultRandom(),
    name: text('name'),
    email: text('email'),
    password: text('password'),
    role: text('role').$type<'admin' | 'customer'>(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (user) => {
    return {
      pk: primaryKey({ name: 'pk_users', columns: [user.id] }),
      idx1: uniqueIndex('idx_user_name').on(user.name),
    };
  },
);

export const AppUser = pgTable(
  'app_users',
  {
    id: uuid('id').defaultRandom(),
    userId: varchar('user_id', { length: 100 }),
    firstName: varchar('first_name', { length: 100 }),
    lastName: varchar('last_name', { length: 100 }),
    userPwd: varchar('user_pwd', { length: 200 }),
    userType: varchar('user_type', { length: 10 }),
    userRole: varchar('user_role', { length: 10 }).$type<
      'Student' | 'Mentor' | 'HOD' | 'Admin'
    >(),
    createdTs: timestamp('created_ts').default(sql`CURRENT_TIMESTAMP`),
    updatedTs: timestamp('updated_ts').default(sql`CURRENT_TIMESTAMP`),
  },
  (user) => {
    return {
      pk: primaryKey({ name: 'pk_app_users', columns: [user.id] }),
      idx1: uniqueIndex('idx_user_id').on(user.userId),
    };
  },
);
