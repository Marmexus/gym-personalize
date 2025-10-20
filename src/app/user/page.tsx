import { db } from "@/db";
import { usersTable } from "@/db/schema";

export default async function UserPage() {
  const users = await db.select().from(usersTable);
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
