import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const TOKEN_KEY = "readsy_auth_token";

function persistToken(token: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Storage may be unavailable (private mode, blocked cookies) — auth
    // simply won't persist across reloads in that case.
  }
}

type AuthState = {
  token: string | null;
};

// Always start with no token, even on the client — reading localStorage here
// would run during the initial render and desync from the server-rendered
// HTML. AuthProvider reads the stored token in a `useEffect` after mount and
// dispatches `setToken`, which is the only place besides login/signup/logout
// this should be set from.
const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      persistToken(action.payload);
    },
    clearToken(state) {
      state.token = null;
      persistToken(null);
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
