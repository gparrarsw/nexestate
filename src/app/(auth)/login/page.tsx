"use client";

import { useState, type FormEvent } from "react";
import { loginWithPassword, registerWithPassword } from "./actions";

type LoginState = "idle" | "loading" | "success" | "error";
type Mode = "login" | "register";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<LoginState>("idle");
  const [mode, setMode] = useState<Mode>("login");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMessage("");

    const action = mode === "login" ? loginWithPassword : registerWithPassword;
    const result = await action(email, password);

    if (result.error) {
      setState("error");
      setErrorMessage(result.error);
    } else if (mode === "register") {
      setState("success");
    } else {
      window.location.href = "/dashboard";
    }
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-background px-4"
      data-testid="login-page"
    >
      <div className="w-full max-w-form" data-testid="login-container">
        {/* Logo */}
        <div className="mb-8 flex justify-center" data-testid="login-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-light.svg"
            alt="NexEstate"
            width={150}
            height={34}
          />
        </div>

        {/* Card */}
        <div
          className="rounded-md border border-gray-100 bg-white p-8"
          data-testid="login-card"
        >
          <h1
            className="mb-2 font-heading text-subheading font-semibold text-primary"
            data-testid="login-title"
          >
            {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </h1>
          <p className="mb-6 text-body-sm text-gray-500">
            {mode === "login"
              ? "Ingresa tus credenciales para acceder."
              : "Registra una cuenta nueva."}
          </p>

          {state === "success" ? (
            <div
              className="rounded-md border border-success/20 bg-success/5 p-4 text-body-sm text-gray-700"
              data-testid="login-success"
              role="alert"
            >
              <p className="font-medium text-primary">Cuenta creada</p>
              <p className="mt-1 text-gray-600">
                Ya puedes iniciar sesión con tu email y contraseña.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate data-testid="login-form">
              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="login-email"
                  className="mb-1.5 block text-label font-semibold text-primary"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@agencia.com"
                  required
                  disabled={state === "loading"}
                  aria-invalid={state === "error"}
                  className="transition-input w-full rounded-sm border border-gray-200 bg-white px-3 py-2.5 text-body text-primary placeholder:text-gray-400 focus:border-accent focus:shadow-focus focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50"
                  data-testid="login-email-input"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label
                  htmlFor="login-password"
                  className="mb-1.5 block text-label font-semibold text-primary"
                >
                  Contraseña
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === "register" ? "Mínimo 6 caracteres" : "••••••••"}
                  required
                  minLength={6}
                  disabled={state === "loading"}
                  className="transition-input w-full rounded-sm border border-gray-200 bg-white px-3 py-2.5 text-body text-primary placeholder:text-gray-400 focus:border-accent focus:shadow-focus focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50"
                  data-testid="login-password-input"
                />
              </div>

              {/* Error */}
              {state === "error" && (
                <p
                  className="mb-4 text-body-sm text-error"
                  role="alert"
                  data-testid="login-error"
                >
                  {errorMessage}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={state === "loading" || !email.trim() || !password.trim()}
                className="transition-button w-full rounded-sm bg-accent px-4 py-2.5 text-body font-medium text-white hover:brightness-[0.85] focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400"
                data-testid="login-submit"
              >
                {state === "loading"
                  ? "Procesando..."
                  : mode === "login"
                    ? "Iniciar sesión"
                    : "Crear cuenta"}
              </button>
            </form>
          )}

          {/* Toggle mode */}
          <p className="mt-4 text-center text-body-sm text-gray-500">
            {mode === "login" ? (
              <>
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => { setMode("register"); setState("idle"); setErrorMessage(""); }}
                  className="font-medium text-accent hover:underline"
                  data-testid="login-toggle-register"
                >
                  Registrarse
                </button>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => { setMode("login"); setState("idle"); setErrorMessage(""); }}
                  className="font-medium text-accent hover:underline"
                  data-testid="login-toggle-login"
                >
                  Iniciar sesión
                </button>
              </>
            )}
          </p>
        </div>

        <p className="mt-6 text-center text-caption text-gray-500">
          © {new Date().getFullYear()} NexEstate. Todos los derechos reservados.
        </p>
      </div>
    </main>
  );
}
