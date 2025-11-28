import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  @Unique(['email'])
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
