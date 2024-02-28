import { Transform } from 'class-transformer';
import { IsString, IsBoolean, IsNotEmpty, IsNumber, } from 'class-validator';

export class CreateUserDto {
  
  @IsString()
  @IsNotEmpty()
  regNumber: string

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
  
  @IsNotEmpty()
  age:number

  isActive?: boolean;
}
