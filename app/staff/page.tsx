"use client";
import { useRouter } from "next/navigation";

export default function StaffPortalPage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/staff/logout", { method: "POST" });
    router.push("/staff/login");
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Staff Portal</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl font-semibold"
          style={{ backgroundColor: "#7AA2F7", color: "#081b17" }}
        >
          Sign out
        </button>
      </div>
      {/* ... rest of your portal ... */}
    </main>
  );
}
