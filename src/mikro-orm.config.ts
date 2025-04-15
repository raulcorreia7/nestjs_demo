// src/mikro-orm.config.ts
import { Options, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const config: Options = {
  driver: PostgreSqlDriver,
  dbName: "nestdb",
  user: "your_pg_user",
  password: "your_pg_password",
  host: "localhost",
  port: 5432,
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
};

export default config;