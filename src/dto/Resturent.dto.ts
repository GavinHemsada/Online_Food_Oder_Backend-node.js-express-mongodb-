import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString()
  @IsNotEmpty()
  street!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  state!: string;

  @IsString()
  @IsNotEmpty()
  zipCode!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;
}

export class ResturentDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  ownerName!: string;

  @IsPhoneNumber() 
  phone!: string;

  @IsString()
  @IsNotEmpty()
  foodType!: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address!: AddressDto;
}
