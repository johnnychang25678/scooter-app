import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scooter } from './scooter/scooter.entity';
import { ScooterModule } from './scooter/scooter.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
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
})
export class AppModule {}
