import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateUserprofileDto {

  @IsNumber()
  userId: number;

  @IsString()
  profileInfo: string;

  @IsEmail()
  email: string
}