"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, adminFieldClass } from "./fields";
import { Crown } from "lucide-react";

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
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-b from-violet-deep via-background to-background px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-violet-500/25 bg-card/90 p-8 shadow-[0_0_60px_-10px] shadow-primary/30">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <Crown className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl tracking-wider text-violet-soft">Ballas CMS</h1>
            <p className="text-sm text-muted-foreground">دخول الإدارة · Admin Login</p>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <Field label="كلمة المرور · Password" hint="لا تُخزَّن في الواجهة · Not stored in the UI">
            <Input
              type="password"
              autoComplete="current-password"
              className={adminFieldClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </Field>
          {error ? (
            <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={loading || !password.trim()}>
            {loading ? "جاري التحقق…" : "دخول · Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}