import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsMongoId,
  IsDate,
  IsOptional
} from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderStatesENUM {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Preparing = 'preparing',
  Ready = 'ready',
  Delivered = 'delivered',
  Cancelled = 'cancelled'
}

export class OrderDto {
  @IsMongoId()
  @IsNotEmpty()
  resturent!: string;

  @IsNumber()
  amount!: number;

  @IsEnum(OrderStatesENUM)
  @IsOptional()
  orderStates?: OrderStatesENUM;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  orderDate?: Date;
}
