"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4321/");
      const text = await response.text();
      setMessage(text);
    } catch (error) {
      setMessage("request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex w-full max-w-xl flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-zinc-900">
          Frontend ↔ Backend
        </h1>
        <p className="text-zinc-600">
          Click the button to call the Flask backend and print the response.
        </p>
        <button
          type="button"
          onClick={handleClick}
          className="h-12 w-fit rounded-lg bg-zinc-900 px-5 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Loading..." : "Call Backend"}
        </button>
        <div className="min-h-[24px] text-sm text-zinc-800">
          {message && <span>Response: {message}</span>}
        </div>
      </main>
    </div>
  );
}
