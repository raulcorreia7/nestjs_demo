import { CacheInterceptor } from "@nestjs/cache-manager";
import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { PhotosService } from "../service/photos.service";
import { Photos } from "../types/photos.types";

@Controller("/photos")
@UseInterceptors(CacheInterceptor)
export class PhotosController {
  constructor(private readonly photoService: PhotosService) {}

  @Get()
  async getPhotos(@Query("albumId") albumId: number): Promise<Photos[]> {
    if (albumId === null || albumId < 0) {
      throw new BadRequestException(
        "AlbumID needs to be defined or a positive number."
      );
    }

    const photos = await this.photoService.getPhotosByAlbumId(albumId);
    return photos;
  }
}
