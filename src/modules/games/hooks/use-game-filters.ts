import { parseAsArrayOf, parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";

const sortValues = ["newest", "oldest", "default"] as const;

const params = {
  sort: parseAsStringLiteral(sortValues).withDefault("default"),
  minYear: parseAsString
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault(""),
  maxYear: parseAsString
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault(""),
  genres: parseAsArrayOf(parseAsString)
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault([]),
}

export const useGameFilters = () => {
  return useQueryStates(params);
}