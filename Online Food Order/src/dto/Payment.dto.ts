import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate
} from 'class-validator';
import { Type } from 'class-transformer';

export enum PaymentMethordsENUM {
  Card = 'card',
  Cash = 'cash',
}

export enum PaymentStatesENUM {
  Paid = 'paid',
  Failed = 'failed',
  Pending = 'pending',
}

export class PaymentDto {
  @IsMongoId()
  @IsNotEmpty()
  order!: string;

  @IsMongoId()
  @IsNotEmpty()
  customer!: string;

  @IsEnum(PaymentMethordsENUM)
  @IsOptional()
  methord?: PaymentMethordsENUM;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  paymentDate?: Date;

  @IsEnum(PaymentStatesENUM)
  @IsOptional()
  states?: PaymentStatesENUM;

  @IsNumber()
  @IsNotEmpty()
  amount!: number;
}
