import { eq } from "drizzle-orm";
import { db } from "..";
import { InsertUser, SelectUser, user } from "../schema";

export async function createUser(data: InsertUser): Promise<void> {
  await db.insert(user).values(data);
}

export async function findUserByField(
  field: keyof Pick<SelectUser, "id" | "username" | "email">,
  value: number | string
): Promise<SelectUser | null> {
  const result = await db
    .select()
    .from(user)
    .where(eq(user[field], value))
    .limit(1);
  return result[0];
}
