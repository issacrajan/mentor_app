import { sql } from 'drizzle-orm';
import { date, integer, varchar } from 'drizzle-orm/pg-core';
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

export const StudentInfo = pgTable(
  'student_info',
  {
    id: uuid('id').defaultRandom(),
    userId: varchar('user_id', { length: 100 }),
    fullName: varchar('full_name', { length: 100 }),
    usn: varchar('usn', { length: 100 }),

    studentDOB: date('student_dob'),
    studentGender: varchar('student_gender', { length: 10 }).$type<
      'Male' | 'Female'
    >(),
    studentRank: integer('student_rank'),
    admissionCategory: varchar('admission_category', { length: 15 }).$type<
      'Management' | 'Payment' | 'CET'
    >(),
    accommodation: varchar('accommodation', { length: 20 }).$type<
      'DayScholar' | 'Hostel' | 'PayingGuest'
    >(),
    mobileNumber: varchar('mobile_number', { length: 20 }),
    emailId: varchar('email_id', { length: 100 }),
    bloodGroup: varchar('blood_group', { length: 10 }),
    createdTs: timestamp('created_ts').default(sql`CURRENT_TIMESTAMP`),
    updatedTs: timestamp('updated_ts').default(sql`CURRENT_TIMESTAMP`),
  },
  (student) => {
    return {
      pk: primaryKey({ name: 'pk_student_info', columns: [student.id] }),
      idx1: uniqueIndex('student_info_user_id').on(student.userId),
    };
  },
);

export const StudentParentInfo = pgTable(
  'student_parent_info',
  {
    id: uuid('id').defaultRandom(),
    studentRecordId: varchar('student_record_id', { length: 100 }),
    fatherName: varchar('father_name', { length: 100 }),
    motherName: varchar('mother_name', { length: 100 }),
    occupation: varchar('occupation', { length: 150 }),
    currentAddress: varchar('current_address', { length: 250 }),
    mobileNumber: varchar('mobile_number', { length: 20 }),
    emailId: varchar('email_id', { length: 100 }),
    createdTs: timestamp('created_ts').default(sql`CURRENT_TIMESTAMP`),
    updatedTs: timestamp('updated_ts').default(sql`CURRENT_TIMESTAMP`),
  },
  (studentParent) => {
    return {
      pk: primaryKey({
        name: 'pk_student_parent_info',
        columns: [studentParent.id],
      }),
    };
  },
);

export const StudentGuardianInfo = pgTable(
  'student_guardian_info',
  {
    id: uuid('id').defaultRandom(),
    studentRecordId: varchar('student_record_id', { length: 100 }),
    guardianName: varchar('guardian_name', { length: 100 }),
    occupation: varchar('occupation', { length: 150 }),
    currentAddress: varchar('current_address', { length: 250 }),
    mobileNumber: varchar('mobile_number', { length: 20 }),
    emailId: varchar('email_id', { length: 100 }),
    createdTs: timestamp('created_ts').default(sql`CURRENT_TIMESTAMP`),
    updatedTs: timestamp('updated_ts').default(sql`CURRENT_TIMESTAMP`),
  },
  (StudentGuardianInfo) => {
    return {
      pk: primaryKey({
        name: 'pk_student_guardian_info',
        columns: [StudentGuardianInfo.id],
      }),
    };
  },
);
