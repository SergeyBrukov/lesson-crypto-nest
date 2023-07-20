import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { AppError } from "../common/errors";
import { UserLoginDto } from "./dto";
import { AuthUserResponse } from "./response";
import { TokenService } from "../token/token.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {
  }

  async registerUsers(dto: CreateUserDto): Promise<CreateUserDto> {
    const existUser = await this.userService.findUserByEmail(dto.email);

    if (existUser) {
      throw new BadRequestException(AppError.USER_EXIST);
    }

    return this.userService.createUser(dto);
  }


  async loginUser(dto: UserLoginDto): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByEmail(dto.email);

    if (!existUser) {
      throw new BadRequestException(AppError.USER_NOT_EXIST);
    }

    const validatePassword = await bcrypt.compare(dto.password, existUser.password);

    if (!validatePassword) {
      throw new BadRequestException(AppError.WRONG_DATA);
    }

    const token = await this.tokenService.generateJwtToken({ id: existUser.id, email: existUser.email });

    const {userName, firstName,email,id, watchList} = await this.userService.getProfileUser(dto.email);

    const user = {
      userName, firstName,email,id, watchList
    }

    return { ...user, token };
  }
}
