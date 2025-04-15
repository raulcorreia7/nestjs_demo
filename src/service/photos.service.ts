import { Cache, CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UseInterceptors,
} from "@nestjs/common";
import axios from "axios";
import _ from "underscore";
import { Photos } from "../types/photos.types";

@Injectable()
@UseInterceptors(CacheInterceptor)
export class PhotosService {
  private url: string = "https://jsonplaceholder.typicode.com/photos";

  private static TTL: number = 1000 * 60 * 10;
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

      const data = _.sortBy(call.data, "id");
      await this.cacheManager.set(cacheKey, data, PhotosService.TTL);
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
