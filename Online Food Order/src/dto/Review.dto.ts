import { IsMongoId, IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class ReviewDTO {
  @IsMongoId()
  @IsNotEmpty()
  order!: string;

  @IsMongoId()
  @IsNotEmpty()
  customer!: string;

  @IsMongoId()
  @IsNotEmpty()
  resturent!: string;

  @IsString()
  @IsNotEmpty()
  comment?: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rate!: number;
}
