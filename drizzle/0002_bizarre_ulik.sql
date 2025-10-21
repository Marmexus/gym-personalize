CREATE TYPE "public"."exercise_category" AS ENUM('arms', 'shoulders', 'chest', 'back', 'core', 'legs', 'full_body', 'mobility', 'cardio');--> statement-breakpoint
CREATE TYPE "public"."exercise_equipment" AS ENUM('dumbbell', 'barbell', 'bodyweight');--> statement-breakpoint
CREATE TYPE "public"."pr_type" AS ENUM('weight', 'reps', 'sets');--> statement-breakpoint
CREATE TYPE "public"."weekday" AS ENUM('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');--> statement-breakpoint
ALTER TABLE "exercises" ALTER COLUMN "equipment" SET DATA TYPE "public"."exercise_equipment" USING "equipment"::"public"."exercise_equipment";--> statement-breakpoint
ALTER TABLE "exercises" ALTER COLUMN "category" SET DATA TYPE "public"."exercise_category" USING "category"::"public"."exercise_category";--> statement-breakpoint
ALTER TABLE "personal_records" ALTER COLUMN "type" SET DATA TYPE "public"."pr_type" USING "type"::"public"."pr_type";