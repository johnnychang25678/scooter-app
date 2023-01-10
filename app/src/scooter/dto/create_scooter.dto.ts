import { IsNotEmpty } from 'class-validator';

export class CreateScooterDto {
  @IsNotEmpty()
  public readonly name: string;
  @IsNotEmpty()
  public readonly age: number;
}
