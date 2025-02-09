/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

import { toast } from "sonner";
import { logOut, setUser } from "../features/auth/authSlice";
const baseQuery = fetchBaseQuery({
  baseUrl: "https://book-store-as4.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOption): Promise<any> => {
  let result = await baseQuery(args, api, extraOption);
  if (result.error?.status === 404) {
    toast.error("Not Found Error");
  }
  if (result.error?.status === 401) {
    console.log("sending refresh token");
    const res = await fetch(
      "https://book-store-as4.vercel.app/api/v1/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );
    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user: user,
          token: data.data.accessToken,
        })
      );
      result = await baseQuery(args, api, extraOption);
    } else {
      console.log("refresh token failed");
      api.dispatch(logOut());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["users", "book", "order"],
  endpoints: () => ({}),
});
