import { IsString, Length, IsNumber } from 'class-validator';

export class CreateFoodInput {
  @IsString()
  @Length(2, 50, { message: 'Name must be between 2 and 50 characters' })
  name!: string;

  @IsString()
  @Length(5, 500, { message: 'Description must be between 5 and 500 characters' })
  description!: string;

  @IsString()
  @Length(3, 50, { message: 'Category must be between 3 and 50 characters' })
  category!: string;

  @IsString()
  @Length(3, 50, { message: 'Food type must be between 3 and 50 characters' })
  foodType!: string;

  @IsString()
  @Length(1, 20, { message: 'Ready time must be between 1 and 20 characters' })
  readyTime!: string;

  @IsNumber({}, { message: 'Price must be a number' })
  price!: number;
}
