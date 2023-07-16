import * as bcrypt from "bcrypt";
import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "./model/user.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { AppError } from "../common/errors";

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User)
    private readonly userRepository: typeof User
  ) {
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {

    const existUser = await this.findUserByEmail(dto.email);

    if (existUser) {
      throw new BadRequestException(AppError.USER_EXIST);
    }

    dto.password = await this.hashPassword(dto.password);

    const newUser = {
      firstName: dto.firstName,
      userName: dto.userName,
      email: dto.email,
      password: dto.password
    };

    await this.userRepository.create(newUser);

    return dto;
  }

}
