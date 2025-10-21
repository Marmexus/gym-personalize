import {
  exerciseCategoryEnumValues,
  exerciseEquipmentEnumValues,
  prTypeEnumValues,
  weekdayEnumValues,
} from "@/types";
import {
  integer,
  pgEnum,
  pgTable,
  smallint,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const exerciseEquipmentEnum = pgEnum(
  "exercise_equipment",
  exerciseEquipmentEnumValues
);
export const exerciseCategoryEnum = pgEnum(
  "exercise_category",
  exerciseCategoryEnumValues
);

export const weekdayEnum = pgEnum("weekday", weekdayEnumValues);

export const personalRecordEnum = pgEnum("pr_type", prTypeEnumValues);

export const user = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }).notNull(),
  username: varchar({ length: 100 }).notNull().unique(),
  email: varchar({ length: 100 }).notNull().unique(),
  password: varchar({ length: 100 }).notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow(),
  updated_at: timestamp({ withTimezone: true }).defaultNow(),
});

export const exercise = pgTable("exercises", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  equipment: exerciseEquipmentEnum(),
  category: exerciseCategoryEnum(),
  user_id: integer("user_id").references(() => user.id),
  created_at: timestamp({ withTimezone: true }).defaultNow(),
});

export const workout = pgTable("workouts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  user_id: integer("user_id").references(() => user.id),
  created_at: timestamp({ withTimezone: true }).defaultNow(),
});

export const workoutExercise = pgTable("workout_exercises", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  workout_id: integer("workout_id").references(() => workout.id),
  exercise_id: integer("exercise_id").references(() => exercise.id),
  reps: smallint(),
  sets: smallint(),
  weight: smallint(),
});

export const workoutSchedule = pgTable("workout_schedule", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer("user_id").references(() => user.id),
  workout_id: integer("workout_id").references(() => workout.id),
  weekday: weekdayEnum(),
  created_at: timestamp({ withTimezone: true }).defaultNow(),
});

export const personalRecord = pgTable("personal_records", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer("user_id").references(() => user.id),
  exercise_id: integer("exercise_id").references(() => exercise.id),
  value: smallint().notNull(),
  type: personalRecordEnum(),
  achived_at: timestamp({ withTimezone: true }).defaultNow(),
  created_at: timestamp({ withTimezone: true }).defaultNow(),
});
