import { db } from "@/db";
import { user } from "@/db/schema";

export default async function UserPage() {
  const users = await db.select().from(user);
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
