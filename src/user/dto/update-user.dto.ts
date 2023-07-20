import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  userName: string

  @ApiProperty()
  @IsString()
  firstName: string

  // @ApiProperty()
  // @IsString()
  // @IsOptional()
  // password?: string
}
