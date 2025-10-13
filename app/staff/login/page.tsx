"use client";

import { useState } from "react";

export default function StaffLoginPage() {
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
        body: new URLSearchParams({ password }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      if (res.ok) {
        window.location.href = "/staff";
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.message || "Invalid password");
      }
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
        />
        {error && <div className="text-sm text-red-400">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl font-semibold"
          style={{ backgroundColor: "#7AA2F7", color: "#081b17", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
