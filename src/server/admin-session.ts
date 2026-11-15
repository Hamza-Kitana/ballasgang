import { clearSession, useSession } from "@tanstack/react-start/server";

export type AdminSessionData = {
  role?: "admin";
  at?: number;
};

function sessionPassword() {
  const secret =
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.JSONBIN_MASTER_KEY?.trim() ||
    "ballas-dev-session-secret-change-me-32";
  // useSession requires >= 32 chars
  return secret.padEnd(32, "0").slice(0, 64);
}

export function getSessionConfig() {
  return {
    name: "ballas-admin",
    password: sessionPassword(),
    maxAge: 60 * 60 * 24 * 7, // 7 days
    cookie: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    },
  };
}

export async function getAdminSession() {
  return useSession<AdminSessionData>(getSessionConfig());
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (session.data.role !== "admin") {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export async function loginAdmin(password: string) {
  const expected = process.env.ADMIN_PASSWORD?.trim();
  if (!expected) {
    throw new Error("ADMIN_PASSWORD is not configured on the server");
  }
  if (password !== expected) {
    throw new Error("INVALID_PASSWORD");
  }
  const session = await getAdminSession();
  await session.update({ role: "admin", at: Date.now() });
  return true;
}

export async function logoutAdmin() {
  await clearSession(getSessionConfig());
}

export async function isAdminAuthenticated() {
  const session = await getAdminSession();
  return session.data.role === "admin";
}
