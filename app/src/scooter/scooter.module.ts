import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScooterController } from './scooter.controller';
import { Scooter } from './scooter.entity';
import { ScooterService } from './scooter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Scooter])],
  providers: [ScooterService],
  controllers: [ScooterController],
})
export class ScooterModule {}
