CREATE TABLE IF NOT EXISTS "app_users" (
	"id" uuid DEFAULT gen_random_uuid(),
	"user_id" varchar(100),
	"first_name" varchar(100),
	"last_name" varchar(100),
	"user_pwd" varchar(200),
	"user_type" varchar(10),
	"user_role" varchar(10),
	"created_ts" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_ts" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "pk_app_users" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student_guardian_info" (
	"id" uuid DEFAULT gen_random_uuid(),
	"student_record_id" varchar(100),
	"guardian_name" varchar(100),
	"occupation" varchar(150),
	"current_address" varchar(250),
	"mobile_number" varchar(20),
	"email_id" varchar(100),
	"created_ts" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_ts" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "pk_student_guardian_info" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student_info" (
	"id" uuid DEFAULT gen_random_uuid(),
	"user_id" varchar(100),
	"full_name" varchar(100),
	"usn" varchar(100),
	"student_dob" date,
	"student_gender" varchar(10),
	"student_rank" integer,
	"admission_category" varchar(15),
	"accommodation" varchar(20),
	"mobile_number" varchar(20),
	"email_id" varchar(100),
	"blood_group" varchar(10),
	"created_ts" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_ts" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "pk_student_info" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student_parent_info" (
	"id" uuid DEFAULT gen_random_uuid(),
	"student_record_id" varchar(100),
	"father_name" varchar(100),
	"mother_name" varchar(100),
	"occupation" varchar(150),
	"current_address" varchar(250),
	"mobile_number" varchar(20),
	"email_id" varchar(100),
	"created_ts" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_ts" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "pk_student_parent_info" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "test_users" (
	"id" uuid DEFAULT gen_random_uuid(),
	"name" text,
	"email" text,
	"password" text,
	"role" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "pk_users" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_user_id" ON "app_users" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "student_info_user_id" ON "student_info" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_user_name" ON "test_users" USING btree ("name");