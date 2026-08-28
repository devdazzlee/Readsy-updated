"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "./AuthProvider";

type GoogleCredentialResponse = { credential: string };

type GoogleIdConfig = {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
};

type GoogleButtonOptions = {
  type?: "standard" | "icon";
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
  shape?: "rectangular" | "pill" | "circle" | "square";
  width?: number;
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleIdConfig) => void;
          renderButton: (parent: HTMLElement, options: GoogleButtonOptions) => void;
        };
      };
    };
  }
}

/**
 * Renders Google's own "Continue with Google" button (via Google Identity
 * Services, loaded globally in the root layout) and exchanges the resulting
 * credential for a Readsy session through AuthProvider.loginWithGoogle.
 *
 * Renders nothing if NEXT_PUBLIC_GOOGLE_CLIENT_ID isn't configured, rather
 * than showing a button that can't actually work.
 */
export function GoogleSignInButton({
  onSuccess,
  onError,
  text = "continue_with",
  intent,
}: {
  onSuccess: () => void;
  onError?: (message: string) => void;
  text?: GoogleButtonOptions["text"];
  /** "login" requires an existing account and errors if none is found,
   *  matching the email/password flow — it never silently creates one.
   *  "signup" (default) creates an account on first sign-in. */
  intent?: "login" | "signup";
}) {
  const { loginWithGoogle } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId) return;
    let cancelled = false;
    let pollInterval: ReturnType<typeof setInterval> | undefined;
    let pollTimeout: ReturnType<typeof setTimeout> | undefined;

    function render() {
      if (cancelled || !containerRef.current || !window.google?.accounts?.id) return;

      window.google.accounts.id.initialize({
        client_id: clientId as string,
        callback: async (response) => {
          try {
            await loginWithGoogle(response.credential, intent);
            onSuccess();
          } catch (err) {
            onError?.(
              err instanceof Error ? err.message : "Could not sign you in with Google.",
            );
          }
        },
      });
      containerRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(containerRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        shape: "pill",
        width: 320,
        text,
      });
    }

    if (window.google?.accounts?.id) {
      render();
    } else {
      // The GIS script (accounts.google.com/gsi/client) loads globally via
      // next/script in the root layout — poll briefly until it's ready
      // instead of loading a duplicate copy here.
      pollInterval = setInterval(() => {
        if (window.google?.accounts?.id) {
          if (pollInterval) clearInterval(pollInterval);
          render();
        }
      }, 150);
      pollTimeout = setTimeout(() => {
        if (pollInterval) clearInterval(pollInterval);
      }, 8000);
    }

    return () => {
      cancelled = true;
      if (pollInterval) clearInterval(pollInterval);
      if (pollTimeout) clearTimeout(pollTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, text, intent]);

  if (!clientId) return null;

  return <div ref={containerRef} className="flex justify-center" />;
}
