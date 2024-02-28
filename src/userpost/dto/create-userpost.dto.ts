import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserpostDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
  @IsString()
  title: string;
  @IsString()
  content: string;
}
