import {
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class FoodDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  price!: number;
}
