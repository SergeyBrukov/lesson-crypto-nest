import * as bcrypt from "bcrypt";
import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "./model/user.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { AppError } from "../common/errors";
import { UpdateUserDto } from "./dto/update-user.dto";
import { WatchListModel } from "../watch-list/model/watchList.model";

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

  async getProfileUser(email: string) {
    return this.userRepository.findOne({
      where: { email }, attributes: {
        exclude: ["password"],
      },
      include: {
        model: WatchListModel,
        required: false
      }
    });
  }

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {

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

  async updateUser(dto: UpdateUserDto, user: User) {

    const existUser = await this.findUserByEmail(user.email);

    if (!existUser) {
      throw new BadRequestException(AppError.USER_NOT_EXIST);
    }

    return this.userRepository.update(dto, { where: { email: user.email } });
  }

  async deleteUser(user: User) {
    const existUser = await this.findUserByEmail(user.email);

    if (!existUser) {
      throw new BadRequestException(AppError.USER_NOT_EXIST);
    }

    return this.userRepository.destroy({where: { email: existUser.email }})
  }

}
