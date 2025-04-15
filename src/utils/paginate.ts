import * as R from "remeda";
import { PaginatedResponseType } from "../types/generic.types";

export function totalPages(items: unknown[], limit: number) {
  return Math.ceil(items.length / limit);
}

export function paginate<T>(items: T[], page: number, limit: number) {
  const tItems = items.length;
  const tPages = totalPages(items, limit);
  const data = items.slice((page - 1) * limit, page * limit);

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

export function f_paginate<T>(
  items: T[],
  page: number,
  limit: number
): PaginatedResponseType<T> {
  const tItems = items.length;
  const tPages = totalPages(items, limit);

  const data = R.pipe(items, R.drop((page - 1) * limit), R.take(limit));

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
