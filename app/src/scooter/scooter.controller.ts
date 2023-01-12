import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { GetScooterQueryDto } from './dto/get-scooter-query.dto';
import { ResponseDto } from './dto/response.dto';
import { ScooterService } from './scooter.service';

@ApiTags('scooters')
@Controller('scooters')
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  @ApiOperation({
    summary:
      'get scooters by query param, if no query param will get all scooters data',
  })
  @Get()
  async get(@Query() query: GetScooterQueryDto) {
    console.log(query);
    const result = await this.scooterService.findByQuery(query);
    return apiResponse(result);
  }

  @ApiOperation({
    summary: 'add a new scooter to the db, plate needs to be unique',
  })
  @Post()
  async create(@Body() data: CreateScooterDto) {
    await this.scooterService.create(data);
    return apiResponse({});
  }

  @ApiOperation({
    summary: 'update scooter by id',
  })
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: CreateScooterDto) {
    await this.scooterService.update(id, data);
    return apiResponse({});
  }
}

function apiResponse(data, message = 'ok'): ResponseDto {
  return new ResponseDto(message, data);
}
