import * as Belt from "@mobily/ts-belt";
import { PaginatedResponseType } from "../types/generic.types";

export function totalPages(items: unknown[], limit: number) {
  return Math.ceil(items.length / limit);
}

export function paginate<T>(
  items: T[],
  page: number,
  limit: number
): PaginatedResponseType<T> {
  const tItems = items.length;
  const tPages = totalPages(items, limit);

  const data = Belt.pipe(
    items,
    Belt.A.drop((page - 1) * limit),
    Belt.A.take(limit),
    Belt.F.toMutable
  );

  return {
    data,
    meta: {
      page,
      limit,
      totalItems: tItems,
      totalPages: tPages,
    },
  };
}
