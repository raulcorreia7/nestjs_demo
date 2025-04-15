import { Cache, CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UseInterceptors,
} from "@nestjs/common";
import axios from "axios";
import * as Belt from "@mobily/ts-belt";
import { Photos } from "../types/photos.types";
import { config } from "../config/config";
@Injectable()
@UseInterceptors(CacheInterceptor)
export class PhotosService {
  private url: string = "https://jsonplaceholder.typicode.com/photos";
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getPhotosByAlbumId(albumId: number): Promise<Photos[]> {
    const cacheKey = `photos_album_${albumId}`;
    const cached = await this.cacheManager.get<Photos[]>(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const call = await axios.get<Photos[]>(this.url, {
        params: { albumId },
      });

      const data = Belt.pipe(
        call.data,
        Belt.A.uniqBy((x) => x.id),
        Belt.A.sortBy((x) => x.id),
        Belt.F.toMutable
      );

      await this.cacheManager.set(cacheKey, data, config.photos.ttl);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        Logger.error(
          `Error fetching photos for album ${albumId}: ${error.message}`
        );
      }
      throw new InternalServerErrorException("Failed to fetch photos!");
    }
  }
}
