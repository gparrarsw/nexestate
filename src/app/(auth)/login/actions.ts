"use server";

import { signInWithPassword, signUpWithPassword } from "@/lib/supabase/auth";

export async function loginWithPassword(
  email: string,
  password: string,
): Promise<{ error?: string }> {
  try {
    await signInWithPassword(email, password);
    return {};
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? err.message
          : "Ocurrió un error. Intenta nuevamente.",
    };
  }
}

export async function registerWithPassword(
  email: string,
  password: string,
): Promise<{ error?: string }> {
  try {
    await signUpWithPassword(email, password);
    return {};
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? err.message
          : "Ocurrió un error. Intenta nuevamente.",
    };
  }
}
