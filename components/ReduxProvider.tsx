"use client";

import { useRef, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/lib/store";

export function ReduxProvider({ children }: { children: ReactNode }) {
  // One store per component tree (not a module-level singleton) so
  // server-rendered requests never leak state between users/sessions.
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
