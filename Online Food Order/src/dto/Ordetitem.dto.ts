import { IsMongoId, IsNumber, IsNotEmpty } from 'class-validator';

export class OrderItemDto {
  @IsMongoId()
  @IsNotEmpty()
  order!: string;

  @IsMongoId()
  @IsNotEmpty()
  food!: string;

  @IsNumber()
  quantity!: number;

  @IsNumber()
  price!: number;
}
