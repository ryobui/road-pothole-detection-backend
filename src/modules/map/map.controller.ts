import { Body, Controller, Get, HttpStatus, Post, Query, UseInterceptors } from "@nestjs/common";
import { CreatePotholeDto } from "./dtos/create-pothole.dto";
import { MapService } from "./map.service";
import { PointDto } from "./dtos/direction.dto";
import { ParsePointPipe } from "./pipes/parse-point-pipe";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";
import { ApiResponse } from "@common/decorators/metadata/api-response.metadata";

@Controller('map')
export class MapController {
    constructor(private readonly mapService: MapService) {}

    @Post('potholes')
    createPothole (@Body() createPotholeData: CreatePotholeDto) {
        return this.mapService.createPothole(createPotholeData)
    }
     
    @Get('potholes')
    @UseInterceptors(CacheInterceptor)
    @ApiResponse(HttpStatus.OK, 'Get list pothole success')
    @CacheTTL(30000)
    getAllPothole() {
        return this.mapService.getAllPothole()
    }

    @Get('directions')
    @UseInterceptors(CacheInterceptor)
    @ApiResponse(HttpStatus.OK, 'Get directions success.')
    @CacheTTL(30000)
    getDirections(@Query('startingPoint', ParsePointPipe) startingPoint: PointDto,
    @Query('endPoint', ParsePointPipe) endPoint: PointDto,) {
        return this.mapService.directions({startingPoint, endPoint})
    }
}