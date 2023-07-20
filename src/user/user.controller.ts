import { Body, Controller, Delete, Patch, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  // @Post('create-user')
  // @ApiBody({
  //   type: CreateUserDto
  // })
  // @ApiResponse({
  //   type: CreateUserDto
  // })
  // createUsers (@Body() dto: CreateUserDto) {
  //   return this.userService.createUser(dto)
  // }

  @UseGuards(JwtAuthGuard)
  @Patch("update-user")
  @ApiBearerAuth()
  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>"
  })
  @ApiBody({
    type: UpdateUserDto
  })
  updateUser(@Body() dto: UpdateUserDto, @Req() request) {
    return this.userService.updateUser(dto, request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("delete-user")
  @ApiBearerAuth()
  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>"
  })
  deleteUser(@Req() request) {
    return this.userService.deleteUser(request.user);
  }
}
