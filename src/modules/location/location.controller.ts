import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Param,
    Patch,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationRepositoryInterface } from '@infrastructure/database/mongodb/repositories/interfaces/location.repository.interface';
import { CreateLocationDto } from './dtos/create-location.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiResponse } from '@common/decorators/metadata/api-response.metadata';
import { UpdateLocationDto } from './dtos/update-location.dto';

@Controller('locations')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Post()
    @ApiResponse(HttpStatus.CREATED, 'Create location success')
    async create(@Body() payload: CreateLocationDto) {
        return await this.locationService.create(payload);
    }

    @Patch(':id')
    @ApiResponse(HttpStatus.CREATED, 'Create location success')
    async update(@Param('id') id: string, @Body() payload: UpdateLocationDto) {
        return await this.locationService.update(id, payload);
    }

    @Get('search')
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30000)
    @ApiResponse(HttpStatus.OK, 'Search location success')
    async search(@Query('keyword') keyword: string) {
        return await this.locationService.search(keyword);
    }
}
