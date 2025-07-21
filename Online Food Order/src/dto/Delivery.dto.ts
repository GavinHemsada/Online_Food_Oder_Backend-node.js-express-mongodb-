import { IsDate, IsEnum, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export enum DeliveryStatesENUM {
    Pending = "pending",
    Picked_up = "picked_up",
    Arrived = "arrived",
    Delivered = "delivered",
    Cancelled = "cancelled"
}

export class DeliveryDTO {
  @IsMongoId()
  @IsNotEmpty()
  order!: string;

  @IsEnum(DeliveryStatesENUM)
  @IsOptional()
  states?: DeliveryStatesENUM;

  @Type(() => Date)
  @IsDate()
  estimateTime?: Date;

  @Type(() => Date)
  @IsDate()
  actualTime?: Date;
}
