"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin");
      } else {
        setError(data.message || "Failed to login");
      }
    } catch {
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF3E8]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-10">
          <Image src="/logo.svg" alt="Calcutta Sweets" width={200} height={82} className="h-14 w-auto" />
        </div>

        <div className="bg-white rounded-lg border border-[#3E2F26]/10 p-8 shadow-sm">
          <div className="mb-7">
            <h1 className="text-xl font-semibold text-[#3E2F26] mb-1">Admin Sign In</h1>
            <p className="text-xs text-[#3E2F26]/45 tracking-wide">Access the content management system</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#3E2F26]/60 tracking-widest uppercase mb-2">
                Email Address
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/15 rounded text-[#3E2F26] text-sm placeholder-[#3E2F26]/30 focus:outline-none focus:border-[#C8773A] transition-colors"
                placeholder="admin@calcuttasweets.com"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-[#3E2F26]/60 tracking-widest uppercase">
                  Password
                </label>
                <a href="#" className="text-xs text-[#C8773A] hover:opacity-70 transition-opacity">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF3E8] border border-[#3E2F26]/15 rounded text-[#3E2F26] text-sm placeholder-[#3E2F26]/30 focus:outline-none focus:border-[#C8773A] transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C8773A] hover:bg-[#b5692e] text-white text-sm font-semibold py-3 px-4 rounded transition-colors disabled:opacity-50 tracking-wide mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
