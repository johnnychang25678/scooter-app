import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateScooterDto } from './dto/create_scooter.dto';
import { ScooterService } from './scooter.service';

@Controller('scooters')
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}
  @Get()
  getAll(@Query() query: { a: string; b: string; c: string }) {
    console.log(query);
    return this.scooterService.getScooters();
  }
  @Get(':id')
  getById(@Param('id') id: string) {
    console.log('*****', id);
    return {
      id,
    };
  }
  @Post()
  create(@Body() data: CreateScooterDto) {
    return { id: 1, ...data };
  }
}
