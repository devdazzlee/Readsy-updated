import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./index";
import { clearToken } from "./authSlice";
import type {
  AdminOverview,
  AuthUser,
  BlueprintRequestItem,
  ChatSessionDetail,
  ChatSessionSummary,
  ConciergeRequestItem,
  CoverRequestItem,
  Lead,
  MyCoverRequest,
  MyLead,
} from "@/lib/api";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:4000";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

// Wraps the base query so an expired/invalid token (401 from any endpoint)
// clears the session everywhere at once, instead of every caller having to
// remember to do it themselves.
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    api.dispatch(clearToken());
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Me", "MyActivity", "AdminOverview", "Leads", "Covers", "Concierge", "Blueprint", "Chats", "ChatDetail"],
  endpoints: (builder) => ({
    // ---- Auth / account ----
    getMe: builder.query<{ user: AuthUser }, void>({
      query: () => "/api/auth/me",
      providesTags: ["Me"],
    }),
    login: builder.mutation<{ user: AuthUser; token: string }, { email: string; password: string }>({
      query: (body) => ({ url: "/api/auth/login", method: "POST", body }),
      invalidatesTags: ["Me", "MyActivity"],
    }),
    signup: builder.mutation<
      { user: AuthUser; token: string },
      { name: string; email: string; phone?: string; password: string }
    >({
      query: (body) => ({ url: "/api/auth/signup", method: "POST", body }),
      invalidatesTags: ["Me", "MyActivity"],
    }),
    googleLogin: builder.mutation<{ user: AuthUser; token: string }, { credential: string }>({
      query: (body) => ({ url: "/api/auth/google", method: "POST", body }),
      invalidatesTags: ["Me", "MyActivity"],
    }),
    updateProfile: builder.mutation<{ user: AuthUser }, { name: string; phone?: string }>({
      query: (body) => ({ url: "/api/auth/profile", method: "PATCH", body }),
      invalidatesTags: ["Me"],
    }),
    updatePassword: builder.mutation<{ ok: boolean }, { currentPassword: string; newPassword: string }>({
      query: (body) => ({ url: "/api/auth/password", method: "PATCH", body }),
    }),
    getMyActivity: builder.query<{ leads: MyLead[]; coverRequests: MyCoverRequest[] }, void>({
      query: () => "/api/auth/my-activity",
      providesTags: ["MyActivity"],
    }),

    // ---- Cover generator ----
    generateBookCovers: builder.mutation<
      { images: string[] },
      { title: string; subtitle?: string; author?: string; genre: string; style: string; description?: string }
    >({
      query: (body) => ({ url: "/api/book-cover", method: "POST", body }),
      invalidatesTags: ["MyActivity"],
    }),

    // ---- Admin dashboard ----
    getAdminOverview: builder.query<AdminOverview, void>({
      query: () => "/api/admin/overview",
      providesTags: ["AdminOverview"],
    }),
    getAdminLeads: builder.query<{ items: Lead[]; total: number }, number | void>({
      query: (skip = 0) => `/api/admin/leads?skip=${skip}`,
      providesTags: ["Leads"],
    }),
    getAdminCoverRequests: builder.query<{ items: CoverRequestItem[]; total: number }, number | void>({
      query: (skip = 0) => `/api/admin/cover-requests?skip=${skip}`,
      providesTags: ["Covers"],
    }),
    getAdminConcierge: builder.query<{ items: ConciergeRequestItem[]; total: number }, number | void>({
      query: (skip = 0) => `/api/admin/concierge?skip=${skip}`,
      providesTags: ["Concierge"],
    }),
    getAdminBlueprint: builder.query<{ items: BlueprintRequestItem[]; total: number }, number | void>({
      query: (skip = 0) => `/api/admin/blueprint?skip=${skip}`,
      providesTags: ["Blueprint"],
    }),
    getAdminChats: builder.query<{ items: ChatSessionSummary[]; total: number }, number | void>({
      query: (skip = 0) => `/api/admin/chats?skip=${skip}`,
      providesTags: ["Chats"],
    }),
    getAdminChatDetail: builder.query<{ session: ChatSessionDetail }, string>({
      query: (id) => `/api/admin/chats/${id}`,
      providesTags: (_result, _error, id) => [{ type: "ChatDetail", id }],
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useSignupMutation,
  useGoogleLoginMutation,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useGetMyActivityQuery,
  useGenerateBookCoversMutation,
  useGetAdminOverviewQuery,
  useGetAdminLeadsQuery,
  useGetAdminCoverRequestsQuery,
  useGetAdminConciergeQuery,
  useGetAdminBlueprintQuery,
  useGetAdminChatsQuery,
  useGetAdminChatDetailQuery,
} = api;
