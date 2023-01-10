import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScooterController } from './scooter/scooter.controller';
import { ScooterModule } from './scooter/scooter.module';
import { ScooterService } from './scooter/scooter.service';

@Module({
  imports: [ScooterModule],
  controllers: [AppController, ScooterController],
  providers: [AppService, ScooterService],
})
export class AppModule {}
