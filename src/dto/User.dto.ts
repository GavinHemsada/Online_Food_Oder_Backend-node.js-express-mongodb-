import { IsEmail, IsString, MinLength, Validate, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'MatchPassword', async: false })
class MatchPasswordConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: any, args: ValidationArguments) {
    const object = args.object as any;
    return object.password === confirmPassword;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password confirmation does not match password';
  }
}

export class RegisterDto {
  @IsEmail()
  email!: string;

  @MinLength(6)
  @IsString()
  password!: string;

  @IsString()
  @Validate(MatchPasswordConstraint)
  confirmPassword!: string;
}

export class LoginDTO {
  @IsEmail()
  email!: string;

  @MinLength(6)
  @IsString()
  password!: string;
}
