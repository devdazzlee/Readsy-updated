// Small helper for turning an RTK Query error (FetchBaseQueryError |
// SerializedError | undefined) into the plain string our UI components want,
// without every consumer re-implementing the same narrowing logic.

export type RTKQueryError =
  | { status: number | string; data?: { error?: string } }
  | { message?: string }
  | undefined;

export function errorMessage(error: RTKQueryError, fallback = ""): string {
  if (!error) return "";
  if ("data" in error && error.data?.error) {
    return error.data.error;
  }
  if ("message" in error && error.message) {
    return error.message;
  }
  return fallback;
}
