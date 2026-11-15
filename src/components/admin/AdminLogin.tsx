"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, adminFieldClass } from "./fields";
import { Lock } from "lucide-react";

type AdminLoginProps = {
  onLogin: (password: string) => Promise<void>;
  loading?: boolean;
  error?: string | null;
};

export function AdminLogin({ onLogin, loading, error }: AdminLoginProps) {
  const [password, setPassword] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    await onLogin(password);
  };

  return (
    <div className="cms-login relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-10">
      <div className="cms-login-glow pointer-events-none absolute inset-0" />
      <div className="cms-login-card relative z-10 w-full max-w-md overflow-hidden rounded-[1.75rem] p-7 sm:p-9">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-soft/70 to-transparent" />

        <div className="mb-8 flex flex-col items-center text-center">
          <img
            src="/ballas-logo.png"
            alt="Ballas"
            className="h-20 w-auto object-contain drop-shadow-[0_0_28px_oklch(0.64_0.28_305/0.45)]"
            draggable={false}
          />
          <p className="mt-5 text-[10px] tracking-[0.35em] text-violet-soft uppercase">Control Room</p>
          <h1 className="font-display mt-2 text-4xl tracking-[0.08em] text-white">BALLAS CMS</h1>
          <p className="mt-2 text-sm text-white/55">لوحة تحكم السلالة البنفسجية</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <Field label="كلمة المرور">
            <div className="relative">
              <Lock className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <Input
                type="password"
                autoComplete="current-password"
                className={`${adminFieldClass} h-12 ps-10`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
          </Field>
          {error ? (
            <p className="rounded-xl border border-red-400/35 bg-red-500/15 px-3 py-2 text-sm text-red-100">
              {error}
            </p>
          ) : null}
          <Button
            type="submit"
            className="cms-btn-primary h-12 w-full text-sm font-bold tracking-[0.18em]"
            disabled={loading || !password.trim()}
          >
            {loading ? "جاري التحقق…" : "دخول"}
          </Button>
        </form>
      </div>
    </div>
  );
}
