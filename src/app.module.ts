import { Module } from "@nestjs/common";

import { PhotosController } from "./controller/photos.controller";
import { CacheModule } from "@nestjs/cache-manager";
import { PhotosService } from "./service/photos.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import mikroOrmConfig from "./mikro-orm.config";

@Module({
  imports: [
    CacheModule.register({
      ttl: 1000 * 10,
      max: 10,
    }),
    MikroOrmModule.forRoot(mikroOrmConfig)
  ],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class AppModule {}
