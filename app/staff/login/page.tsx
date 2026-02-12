"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StaffLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ password: password.trim() }),
      });

      if (res.ok) {
        // Cookie is now set by the API; navigate into the portal
        router.push("/staff");
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(data?.message || "Invalid password");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-sm mx-auto px-6 py-20 text-white">
      <h1 className="text-2xl font-bold">Staff Portal Login</h1>
      <p className="mt-2 text-neutral-400 text-sm">
        Enter the staff password to access training resources.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          type="password"
          name="password"
          placeholder="Staff password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700"
          required
          autoFocus
        />
        {error && <div className="text-sm text-red-400">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl font-semibold"
          style={{ backgroundColor: "#8FD7FF", color: "#071410", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
