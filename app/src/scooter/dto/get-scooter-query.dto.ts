import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class GetScooterQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsOptional()
  @ApiPropertyOptional()
  brand: string;

  @IsOptional()
  @ApiPropertyOptional()
  plate: string;

  @IsOptional()
  @ApiPropertyOptional({ description: 'mileage greater than' })
  @IsNumber()
  @Type(() => Number)
  mileageGt: number;

  @IsOptional()
  @ApiPropertyOptional({ description: 'mileage less than' })
  @IsNumber()
  @Type(() => Number)
  mileageLt: number;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({ example: '2011-05-01' })
  productionDateBegin: Date;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({ example: '2022-01-03' })
  productionDateEnd: Date;

  @IsOptional()
  @ApiPropertyOptional({ description: 'count of data returned, default 1000' })
  @IsNumber()
  @Type(() => Number)
  limit: number;
}
