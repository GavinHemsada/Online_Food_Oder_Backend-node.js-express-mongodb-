import { IsEmail, Length, IsArray, IsString, IsNumber, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

// DTO for creating a vendor
export class CreateVendorInput {
  @IsString()
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name: string;

  @IsString()
  @Length(3, 50, { message: 'Owner name must be between 3 and 50 characters' })
  ownerName: string;

  @IsArray()
  @IsString({ each: true })
  foodType: string[];

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @Length(4, 12, { message: 'Pincode must be between 4 and 12 characters' })
  pincode: string;

  @IsString()
  @Length(6, 100, { message: 'Address must be between 6 and 100 characters' })
  address: string;

  @IsString()
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;

  @IsString()
  @Length(7, 15, { message: 'Phone number must be between 7 and 15 characters' })
  phone: string;
}

// DTO for editing vendor profile
export class EditVendorInput {
  @IsString()
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name: string;

  @IsString()
  @Length(6, 100, { message: 'Address must be between 6 and 100 characters' })
  address: string;

  @IsString()
  @Length(7, 15, { message: 'Phone number must be between 7 and 15 characters' })
  phone: string;

  @IsArray()
  @IsString({ each: true })
  foodType: string[];
}

// DTO for vendor login
export class VendorLoginInput {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;
}

// Vendor Payload (No validation required, since it's returned data)
export class VendorPayload {
  _id: string;
  email: string;
  name: string;
}

// DTO for creating an offer
export class CreateOfferInputs {
  @IsString()
  @Length(3, 100, { message: 'Title must be between 3 and 100 characters' })
  title: string;

  @IsString()
  @Length(3, 500, { message: 'Description must be between 3 and 500 characters' })
  description: string;

  @IsString()
  @Length(3, 50, { message: 'Offer type must be between 3 and 50 characters' })
  offerType: string;

  @IsNumber()
  offerAmount: number;

  @IsString()
  @Length(4, 12, { message: 'Pincode must be between 4 and 12 characters' })
  pincode: string;

  @IsString()
  @Length(3, 20, { message: 'Promo code must be between 3 and 20 characters' })
  promocode: string;

  @IsString()
  @Length(3, 50, { message: 'Promo type must be between 3 and 50 characters' })
  promoType: string;

  @IsDate()
  @Type(() => Date)
  startValidity: Date;

  @IsDate()
  @Type(() => Date)
  endValidity: Date;

  @IsArray()
  bank: any; // Array of banks (type can be refined if needed)

  @IsArray()
  bins: any; // Array of BINs (type can be refined if needed)

  @IsNumber()
  minValue: number;

  @IsBoolean()
  isActive: boolean;
}