import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Scooter } from './scooter/scooter.entity';
import { ScooterModule } from './scooter/scooter.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'my_db',
      entities: [Scooter],
      synchronize: true,
      logging: true,
    }),
    ScooterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
