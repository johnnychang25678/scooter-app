import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { ResponseDto } from './dto/response.dto';
import { getUser } from './interfaces/get-user.interface';
import { ScooterService } from './scooter.service';

@Controller('scooters')
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}
  @Get()
  async get(@Query() query: getUser) {
    const result = await this.scooterService.findOne(query);
    return apiResponse(result);
  }
  @Get()
  async getAll() {
    const result = await this.scooterService.findAll();
    return apiResponse(result);
  }

  @Post()
  async create(@Body() data: CreateScooterDto) {
    await this.scooterService.create(data);
    return apiResponse({});
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: CreateScooterDto) {
    await this.scooterService.update(id, data);
    return apiResponse({});
  }
}

function apiResponse(data, message = 'ok'): ResponseDto {
  return new ResponseDto(message, data);
}
