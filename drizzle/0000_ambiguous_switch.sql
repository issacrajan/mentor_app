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
CREATE UNIQUE INDEX IF NOT EXISTS "idx_user_name" ON "test_users" USING btree ("name");