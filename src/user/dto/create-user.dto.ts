import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty()
  @IsString()
  firstName: string

  @ApiProperty()
  @IsString()
  userName: string

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  password: string
}
