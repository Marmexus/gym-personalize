import {
  exerciseCategoryEnumValues,
  exerciseEquipmentEnumValues,
  prTypeEnumValues,
  weekdayEnumValues,
} from "@/types";
import {
  boolean,
  pgEnum,
  pgTable,
  smallint,
  text,
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

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  username: text("username").notNull().unique(),
});

export type InsertUser = typeof user.$inferInsert;
export type SelectUser = typeof user.$inferSelect;

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const exercise = pgTable("exercise", {
  id: text("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  equipment: exerciseEquipmentEnum(),
  category: exerciseCategoryEnum(),
  userId: text("user_id").references(() => user.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const workout = pgTable("workout", {
  id: text("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  userId: text("user_id").references(() => user.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const workoutExercise = pgTable("workout_exercise", {
  id: text("id").primaryKey(),
  workoutId: text("workout_id").references(() => workout.id),
  exerciseId: text("exercise_id").references(() => exercise.id),
  reps: smallint(),
  sets: smallint(),
  weight: smallint(),
});

export const workoutSchedule = pgTable("workout_schedule", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  workoutId: text("workout_id").references(() => workout.id),
  weekday: weekdayEnum(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const personalRecord = pgTable("personal_record", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  exerciseId: text("exercise_id").references(() => exercise.id, {
    onDelete: "cascade",
  }),
  value: smallint().notNull(),
  type: personalRecordEnum(),
  achievedAt: timestamp("achieved_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const schema = {
  user,
  session,
  account,
  verification,
  exercise,
  workout,
  workoutExercise,
  workoutSchedule,
  personalRecord,
};
