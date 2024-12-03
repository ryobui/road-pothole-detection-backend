import { Controller, Inject } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationRepositoryInterface } from '@infrastructure/database/mongodb/repositories/interfaces/location.repository.interface';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService, 
    @Inject('LocationRepositoryInterface')
    private readonly locationRepository: LocationRepositoryInterface) {}
    
    
}
