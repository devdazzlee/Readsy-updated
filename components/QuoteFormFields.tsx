"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

type QuoteFormFieldsProps = {
  idPrefix?: string;
  compact?: boolean;
  onSuccess?: () => void;
};

export function QuoteFormFields({
  idPrefix = "quote",
  compact = false,
  onSuccess,
}: QuoteFormFieldsProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log("Quote request:", Object.fromEntries(data.entries()));
    setSubmitted(true);
    onSuccess?.();
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-sky-soft px-5 py-8 text-center">
        <p className="font-display text-xl font-semibold text-navy">
          Thank you. We received your request.
        </p>
        <p className="mt-2 text-sm text-text-muted">
          A publishing specialist will reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className={compact ? "grid gap-3 sm:grid-cols-3" : "flex flex-col gap-3"}>
        <Field
          id={`${idPrefix}-name`}
          name="name"
          label="Full Name"
          placeholder="Your name"
          required
        />
        <Field
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          label="Email"
          placeholder="you@email.com"
          required
        />
        <Field
          id={`${idPrefix}-phone`}
          name="phone"
          type="tel"
          label="Phone"
          placeholder="+1 (555) 000-0000"
          required
        />
      </div>
      {!compact && (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${idPrefix}-project`}
            className="text-sm font-medium text-navy"
          >
            Project brief
          </label>
          <textarea
            id={`${idPrefix}-project`}
            name="project"
            rows={3}
            required
            placeholder="Tell us about your book idea or manuscript..."
            className="w-full resize-none rounded-xl border border-muted-border bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition focus:border-sky focus:ring-2 focus:ring-sky/25"
          />
        </div>
      )}
      <Button type="submit" className="mt-1 w-full">
        {compact ? "Request a Free Quote" : "Get a Free Quote"}
      </Button>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-navy">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-muted-border bg-white px-3.5 text-sm text-navy outline-none transition focus:border-sky focus:ring-2 focus:ring-sky/25"
      />
    </div>
  );
}
