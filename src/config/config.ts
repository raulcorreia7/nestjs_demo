import dotenv from "dotenv";
import { Type, Static } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

dotenv.config();

export const Config = Type.Object({
  postgres: Type.Object({
    host: Type.String({
      minLength: 1,
    }),
    port: Type.Number({
      minimum: 1,
    }),
    user: Type.String({
      minLength: 1,
    }),
    password: Type.String({
      minLength: 1,
    }),
    name: Type.String({
      minLength: 1,
    }),
  }),
  photos: Type.Object({
    ttl: Type.Number({
      minimum: 1,
    }),
  }),
});

export type Config = Static<typeof Config>;

function decodeConfig(): Config {
  const cfg = {
    postgres: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
    },
    photos: {
      ttl: Number(process.env.PHOTOS_TTL),
    },
  };

  if (!Value.Check(Config, cfg)) {
    throw new Error("Invalid configuration");
  }
  return cfg;
}

export const config = decodeConfig();
