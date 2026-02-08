import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Header from "@/components/Header";
import { auth } from "@/lib/better-auth/auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Failed to get session in root layout", error);
    session = null;
  }

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user = {
    id: session?.user.id,
    name: session?.user.name,
    email: session?.user.email,
  };

  return (
    <main className="min-h-screen text-gray-400">
      <Header user={user} />

      <div className="container py-10">{children}</div>
    </main>
  );
};

export default Layout;
