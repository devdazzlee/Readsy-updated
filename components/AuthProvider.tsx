"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getStoredToken, type AuthUser } from "@/lib/api";
import {
  api,
  useGetMeQuery,
  useGoogleLoginMutation,
  useLoginMutation,
  useSignupMutation,
} from "@/lib/store/api";
import { clearToken, setToken } from "@/lib/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (input: { email: string; password: string }) => Promise<void>;
  signup: (input: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => void;
  setUser: (user: AuthUser) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readableError(err: unknown, fallback: string): Error {
  if (err && typeof err === "object" && "data" in err) {
    const data = (err as { data?: { error?: string } }).data;
    if (data?.error) return new Error(data.error);
  }
  if (err instanceof Error) return err;
  return new Error(fallback);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);

  // The token lives in localStorage, which we can only read once mounted on
  // the client — reading it during the initial render would desync from the
  // server-rendered HTML. Until this runs, we don't yet know if the visitor
  // is signed in, so callers should treat `loading` as true.
  const [storageChecked, setStorageChecked] = useState(false);
  useEffect(() => {
    const stored = getStoredToken();
    if (stored) dispatch(setToken(stored));
    setStorageChecked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, isLoading, isFetching } = useGetMeQuery(undefined, {
    skip: !token,
  });

  const [loginMutation] = useLoginMutation();
  const [signupMutation] = useSignupMutation();
  const [googleLoginMutation] = useGoogleLoginMutation();

  async function login(input: { email: string; password: string }) {
    try {
      const result = await loginMutation(input).unwrap();
      dispatch(setToken(result.token));
    } catch (err) {
      throw readableError(err, "Could not log you in.");
    }
  }

  async function signup(input: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) {
    try {
      const result = await signupMutation(input).unwrap();
      dispatch(setToken(result.token));
    } catch (err) {
      throw readableError(err, "Could not create your account.");
    }
  }

  async function loginWithGoogle(credential: string) {
    try {
      const result = await googleLoginMutation({ credential }).unwrap();
      dispatch(setToken(result.token));
    } catch (err) {
      throw readableError(err, "Could not sign you in with Google.");
    }
  }

  function logout() {
    dispatch(clearToken());
    dispatch(api.util.resetApiState());
  }

  function setUser(nextUser: AuthUser) {
    dispatch(
      api.util.updateQueryData("getMe", undefined, (draft) => {
        draft.user = nextUser;
      }),
    );
  }

  const user = data?.user ?? null;
  // Still loading if we haven't checked storage yet, or a token exists but
  // its user hasn't resolved yet — this is what keeps the header from
  // flashing "Log In" before snapping to the profile avatar.
  const loading = !storageChecked || (!!token && (isLoading || isFetching) && !data);

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, login, signup, loginWithGoogle, logout, setUser }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
