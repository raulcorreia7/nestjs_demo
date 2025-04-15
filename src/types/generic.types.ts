import { Static, TSchema, Type } from "@sinclair/typebox";

export const Pagination = Type.Object({
  page: Type.Number({
    minimum: 0,
  }),
  limit: Type.Number({
    minimum: 0,
  }),
  totalItems: Type.Number({
    minimum: 0,
  }),
  totalPages: Type.Number({
    minimum: 0,
  }),
});

export type Pagination = Static<typeof Pagination>;

export const PaginatedResponse = <T extends TSchema>(ItemSchema: T) =>
  Type.Object({
    data: Type.Array(ItemSchema),
    meta: Pagination,
  });

export type PaginatedResponseType<T> = {
  data: T[];
  meta: Pagination;
};

export const PositiveNumber = Type.Number({
  minimum: 1,
});

export type PositiveNumber = Static<typeof PositiveNumber>;