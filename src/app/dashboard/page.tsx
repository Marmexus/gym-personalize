import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signOut } from "../api/sign-out";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  console.log(session);

  return (
    <div className="flex flex-col gap-4">
      <div>Dashboard</div>
      {session && (
        <Button type="button" onClick={signOut}>
          Sign out
        </Button>
      )}
    </div>
  );
}
