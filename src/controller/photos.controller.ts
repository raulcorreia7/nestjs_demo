import { CacheInterceptor } from "@nestjs/cache-manager";
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { PhotosService } from "../service/photos.service";
import { Photos, PhotosPaginated } from "../types/photos.types";
import { PositiveNumber } from "../types/generic.types";
import { Value } from "@sinclair/typebox/value";
import { paginate, totalPages } from "../utils/paginate";

@Controller("/photos")
@UseInterceptors(CacheInterceptor)
export class PhotosController {
  constructor(private readonly photoService: PhotosService) {}

  @Get(":albumId")
  async getPhotos(
    @Param("albumId", ParseIntPipe) albumId: number,
    @Query("page") page?: number,
    @Query("limit") limit?: number
  ): Promise<Photos[] | PhotosPaginated> {
    if (!Value.Check(PositiveNumber, albumId)) {
      throw new BadRequestException(
        "'albumId' needs to be defined or a positive number."
      );
    }

    if (page != null && page < 0) {
      throw new BadRequestException(
        "'page' needs to be defined or a positive number."
      );
    }

    if (limit != null && limit < 0) {
      throw new BadRequestException(
        "'limit' needs to be defined or a positive number."
      );
    }

    const photos: Photos[] = await this.photoService.getPhotosByAlbumId(
      albumId
    );

    if (page && limit) {
      if (page > totalPages(photos, limit)) {
        throw new BadRequestException(
          "requested 'page' is more than the 'totalPages'"
        );
      }
      return paginate(photos, page, limit);
    } else {
      return photos;
    }
  }
}
