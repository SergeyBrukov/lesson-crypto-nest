import { Injectable } from '@nestjs/common';
import { CreateWatchListDto } from './dto/create-watch-list.dto';
import { UpdateWatchListDto } from './dto/update-watch-list.dto';
import { InjectModel } from "@nestjs/sequelize";
import { WatchListModel } from "./model/watchList.model";
import { User } from "../user/model/user.model";

@Injectable()
export class WatchListService {

  constructor(
    @InjectModel(WatchListModel)
    private readonly watchListRepository: typeof WatchListModel
  ) {
  }

  async createAsset(createWatchListDto: CreateWatchListDto, user: User) {
    const asset = {
      name: createWatchListDto.name,
      assetId: createWatchListDto.assetId,
      user: user.id
    }

    await this.watchListRepository.create(asset);

    return asset;
  }

  async remove(id: number, userId: number) {
    return this.watchListRepository.destroy({
      where: {
        id,
        user: userId
      }
    });
  }
}
