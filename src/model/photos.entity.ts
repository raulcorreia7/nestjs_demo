// src/user/user.entity.ts
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Photos {
  @PrimaryKey()
  id!: number;

  @Property()
  albumId!: number;

  @Property()
  title!: string;

  @Property()
  url!: string;

  @Property()
  thumbnailUrl!: string;
}
