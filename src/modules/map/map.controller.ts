import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreatePotholeDto } from "./dtos/create-pothole.dto";
import { MapService } from "./map.service";

@Controller('map')
export class MapController {
    constructor(private readonly mapService: MapService) {}

    @Post('pothole')
    createPothole (@Body() potholeData: CreatePotholeDto) {
        return this.mapService.createPothole(potholeData)
    }
     
    @Get('pothole')
    getAllPothole() {
        return this.mapService.getAllPothole()
    }
}