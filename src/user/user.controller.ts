import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('create-user')
  @ApiBody({
    type: CreateUserDto
  })
  @ApiResponse({
    type: CreateUserDto
  })
  createUsers (@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto)
  }
}
