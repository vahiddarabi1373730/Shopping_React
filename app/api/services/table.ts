import { coreApi } from "@/app/core/RTK_Query/core-api";
export interface TableRequestInterface {
  url: string;
}
export const enhanceApi = coreApi.enhanceEndpoints({
  addTagTypes: ["table"],
});
export const tableApi = enhanceApi.injectEndpoints({
  endpoints: (builder) => ({
    table: builder.query<any, TableRequestInterface>({
      query: ({ url }) => ({ url, method: "GET" }),
      providesTags: ["table"],
    }),
  }),
  overrideExisting: false,
});

export const { useTableQuery } = tableApi;
