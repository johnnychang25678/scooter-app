import { Injectable, Logger } from '@nestjs/common';
import { Scooter } from './interfaces/scooter.interface';

@Injectable()
export class ScooterService {
  private readonly logger = new Logger(ScooterService.name);
  getScooters(): Scooter[] {
    this.logger.log('aaaaaaaaaaaaaa');
    return [{ name: 'johnny', age: 30 }];
  }
}
