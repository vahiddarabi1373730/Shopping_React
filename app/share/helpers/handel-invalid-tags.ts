import type { ResultDescription } from "@reduxjs/toolkit/query";

export const invalidateIfSuccess =
  <T extends string>(tag: T): ResultDescription<T, any, any, any, any> =>
  (result, error) =>
    error ? [] : [tag];
