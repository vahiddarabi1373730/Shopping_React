import { coreApi } from "@/app/core/RTK_Query/core-api";
export interface TableArgs {
  url: string;
  activePage: number;
}
export const enhanceApi = coreApi.enhanceEndpoints({
  addTagTypes: ["table"],
});
export const tableApi = enhanceApi.injectEndpoints({
  endpoints: (builder) => ({
    table: builder.query<any, TableArgs>({
      query: ({ url, activePage }) => ({
        url,
        method: "GET",
        params: { activePage },
      }),
      providesTags: ["table"],
    }),
    tableCount: builder.query<any, TableArgs>({
      query: ({ url }) => ({ url: `${url + "Count"}/count`, method: "GET" }),
      providesTags: ["table"],
    }),
  }),

  overrideExisting: false,
});

export const { useTableQuery, useTableCountQuery } = tableApi;
