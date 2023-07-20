import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { WatchListModel } from "../../watch-list/model/watchList.model";

export class AuthUserResponse {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsString()
  firstName: string

  @ApiProperty()
  @IsString()
  userName: string

  @ApiProperty()
  @IsEmail()
  email: string

  // @ApiProperty()
  // @IsString()
  // password: string

  @ApiProperty()
  @IsString()
  token: string

  @ApiProperty()
  watchList: WatchListModel[]
}