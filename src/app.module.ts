import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PhotosController } from "./controller/photos.controller";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [CacheModule.register({
    ttl: 1000 * 10,
    max: 10
  })],
  controllers: [AppController, PhotosController],
  providers: [AppService],
})
export class AppModule {}
