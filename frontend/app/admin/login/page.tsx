"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function AdminLoginPage() {
  const t = useTranslations("admin.login");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    setLoading(false);
    if (res?.error) {
      setError(true);
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  const inputStyle: React.CSSProperties = {
    borderColor: "var(--color-accent-gold)",
    background: "rgba(255,255,255,.6)",
    color: "var(--color-ink)",
  };

  return (
    <div style={{ padding: "clamp(60px,10vw,120px) 0" }}>
      <RevealOnScroll className="mx-auto max-w-[420px] px-8">
        <h1
          className="m-0 mb-8 text-center font-ethiopic font-bold"
          style={{ fontSize: "clamp(26px,3.6vw,36px)", color: "var(--color-primary-700)" }}
        >
          {t("title")}
        </h1>

        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 rounded-lg border-[1.5px] p-8"
          style={{
            borderColor: "var(--color-accent-gold)",
            background: "linear-gradient(160deg, rgba(244,239,250,.7), rgba(230,219,241,.4))",
          }}
        >
          <label className="flex flex-col gap-1.5">
            <span className="font-ethiopic text-sm font-semibold" style={{ color: "var(--color-primary-700)" }}>
              {t("email")}
            </span>
            <input
              name="email"
              type="email"
              required
              className="rounded-md border-[1.5px] px-4 py-2.5 font-cardo text-[15px] outline-none"
              style={inputStyle}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-ethiopic text-sm font-semibold" style={{ color: "var(--color-primary-700)" }}>
              {t("password")}
            </span>
            <input
              name="password"
              type="password"
              required
              className="rounded-md border-[1.5px] px-4 py-2.5 font-cardo text-[15px] outline-none"
              style={inputStyle}
            />
          </label>

          {error && (
            <p className="font-cardo text-sm" style={{ color: "var(--color-accent-red)" }}>
              {t("error")}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btnp mt-2 rounded px-6 py-3 font-ethiopic font-semibold disabled:opacity-60"
            style={{
              background: "linear-gradient(180deg, var(--color-accent-gold-light), var(--color-accent-gold))",
              color: "var(--color-primary-900)",
            }}
          >
            {t("submit")}
          </button>
        </form>
      </RevealOnScroll>
    </div>
  );
}
