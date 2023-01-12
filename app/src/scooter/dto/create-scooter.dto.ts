import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateScooterDto {
  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  plate: string;

  @IsNotEmpty()
  mileage: number;

  @IsNotEmpty()
  @IsDateString()
  productionDate: Date;
}
