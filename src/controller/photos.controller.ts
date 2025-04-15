import { CacheInterceptor } from "@nestjs/cache-manager";
import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { PhotosService } from "../service/photos.service";
import { Photos, PhotosPaginated } from "../types/photos.types";
import { PositiveNumber } from "../types/generic.types";
import { Value } from "@sinclair/typebox/value";
import { f_paginate, totalPages } from "../utils/paginate";

@Controller("/photos")
@UseInterceptors(CacheInterceptor)
export class PhotosController {
  constructor(private readonly photoService: PhotosService) {}

  @Get()
  async getPhotos(
    @Query("albumId", ParseIntPipe) albumId: number
  ): Promise<Photos[]> {
    if (!Value.Check(PositiveNumber, albumId)) {
      throw new BadRequestException(
        "'albumId' needs to be defined or a positive number."
      );
    }

    const photos: Photos[] = await this.photoService.getPhotosByAlbumId(
      albumId
    );
    return photos;
  }

  @Get("/page")
  async getPhotosPaginated(
    @Query("albumId", ParseIntPipe) albumId: number,
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ): Promise<PhotosPaginated> {
    if (!Value.Check(PositiveNumber, albumId)) {
      throw new BadRequestException(
        "'albumId' needs to be defined or a positive number."
      );
    }

    if (page < 0) {
      throw new BadRequestException(
        "'page' needs to be defined or a positive number."
      );
    }

    if (limit < 0) {
      throw new BadRequestException(
        "'limit' needs to be defined or a positive number."
      );
    }

    const photos: Photos[] = await this.photoService.getPhotosByAlbumId(
      albumId
    );

    if (page > totalPages(photos, limit)) {
      throw new BadRequestException(
        "requested 'page' is more than the 'totalPages'"
      );
    }

    return f_paginate(photos, page, limit);
  }
}
