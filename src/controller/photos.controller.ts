import { Cache, CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";
import {
  Controller,
  Get,
  Inject,
  Logger,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import axios, { HttpStatusCode } from "axios";
import { Photos } from "../types/photos.types";
import _ from "underscore";
@Controller("/photos")
@UseInterceptors(CacheInterceptor)
export class PhotosController {
  private url: string = "https://jsonplaceholder.typicode.com/photos";

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get()
  async getPhotos(@Query("albumId") albumId: number): Promise<Photos[]> {
    const cacheKey = `photos_album_${albumId}`;
    const cached = await this.cacheManager.get<Photos[]>(cacheKey);

    if (cached) {
      return cached;
    }
    const call = await axios.get<Photos[]>(this.url, {
      params: {
        albumId: albumId,
      },
    });

    if (call.status !== HttpStatusCode.Ok) {
      Logger.error("error doing photos api call!");
    }
    const data = _.sortBy(call.data, "id");

    this.cacheManager.set(cacheKey, data, 1000 * 60 * 10);
    return data;
  }
}
