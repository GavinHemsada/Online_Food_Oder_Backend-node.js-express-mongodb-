import { IsEmail, Length, ValidateNested, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

// DTO for creating a customer
export class CreateCustomerInput {
  @IsEmail({}, { message: 'Invalid email format' }) 
  email!: string;

  @Length(7, 12, { message: 'Phone number must be between 7 and 12 characters' })
  phone!: string;

  @Length(6, 12, { message: 'Password must be between 6 and 12 characters' })
  password!: string;
}

// DTO for user login
export class UserLoginInput {
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @Length(6, 12, { message: 'Password must be between 6 and 12 characters' })
  password!: string;
}

// DTO for editing customer profile
export class EditCustomerProfileInput {
  @Length(3, 16, { message: 'First name must be between 3 and 16 characters' })
  firstName!: string;

  @Length(3, 16, { message: 'Last name must be between 3 and 16 characters' })
  lastName!: string;

  @Length(6, 16, { message: 'Address must be between 6 and 16 characters' })
  address!: string;
}

// Interface for customer payload (interfaces don’t require validation)
export interface CustomerPayload {
  _id: string;
  email: string;
  verified: boolean;
}

// Class for cart item
export class CartItem {
  @Length(1, 50, { message: 'Item ID must be between 1 and 50 characters' })
  _id!: string;

  @Type(() => Number)
  @IsPositive({ message: 'Unit count must be a positive number' })
  unit!: number;
}

// DTO for order inputs
export class OrderInputs {
  @Length(1, 50, { message: 'Transaction ID must be between 1 and 50 characters' })
  txnId!: string;

  @Type(() => Number)
  @IsPositive({ message: 'Amount must be a positive number' })
  amount!: number;

  @ValidateNested({ each: true })
  @Type(() => CartItem)
  items!: CartItem[];
}

// DTO for creating a delivery user
export class CreateDeliveryUserInput {
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @Length(7, 12, { message: 'Phone number must be between 7 and 12 characters' })
  phone!: string;

  @Length(6, 12, { message: 'Password must be between 6 and 12 characters' })
  password!: string;

  @Length(3, 12, { message: 'First name must be between 3 and 12 characters' })
  firstName!: string;

  @Length(3, 12, { message: 'Last name must be between 3 and 12 characters' })
  lastName!: string;

  @Length(6, 24, { message: 'Address must be between 6 and 24 characters' })
  address!: string;

  @Length(4, 12, { message: 'Pincode must be between 4 and 12 characters' })
  pincode!: string;
}
