"use client";

import { useState } from "react";

type FileUploadFieldProps = {
  label: string;
  value?: string;
  onUploaded: (url: string) => void;
};

export default function FileUploadField({ label, value, onUploaded }: FileUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(value ?? "");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: form });
    setUploading(false);

    if (res.ok) {
      const data = await res.json();
      setUrl(data.url);
      onUploaded(data.url);
    }
  };

  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-ethiopic text-sm font-semibold" style={{ color: "var(--color-primary-700)" }}>
        {label}
      </span>
      <input
        type="file"
        onChange={handleChange}
        className="rounded-md border-[1.5px] px-4 py-2.5 font-cardo text-sm"
        style={{ borderColor: "var(--color-accent-gold)", background: "rgba(255,255,255,.6)" }}
      />
      {uploading && (
        <span className="font-cardo text-xs" style={{ color: "var(--color-ink-soft)" }}>
          እየተጫነ ነው...
        </span>
      )}
      {url && !uploading && (
        <span className="truncate font-cardo text-xs" style={{ color: "var(--color-accent-green)" }}>
          {url}
        </span>
      )}
    </label>
  );
}
