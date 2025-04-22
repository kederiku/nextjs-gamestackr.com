import { parseAsString, useQueryStates } from "nuqs";

export const useGameFilters = () => {
  return useQueryStates({
    minYear: parseAsString
      .withOptions({
        clearOnDefault: true,
      }),
    maxYear: parseAsString
      .withOptions({
        clearOnDefault: true,
      })
  });
}