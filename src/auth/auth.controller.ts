import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UserLoginDto } from "./dto";
import { AuthUserResponse } from "./response";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("register")
  @ApiBody({
    type: CreateUserDto
  })
  @ApiResponse({
    type: CreateUserDto
  })
  register(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.registerUsers(dto);
  }

  @Post("login")
  @ApiBody({
    type: UserLoginDto
  })
  @ApiResponse({
    status: 200,
    type: AuthUserResponse
  })
  login(@Body() dto: UserLoginDto): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  getProfile(@Request() req) {
    return req.user
  }
}
