import { Type, type Static } from "@sinclair/typebox";

const Photos = Type.Object({
  albumId: Type.String(),
  id: Type.Number(),
  title: Type.String(),
  url: Type.String({ format: "uri" }),
  thumbnailUrl: Type.String({ format: "uri" }),
});

export type Photos = Static<typeof Photos>;