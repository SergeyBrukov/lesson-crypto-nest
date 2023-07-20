import { Module } from '@nestjs/common';
import { WatchListService } from './watch-list.service';
import { WatchListController } from './watch-list.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { WatchListModel } from "./model/watchList.model";

@Module({
  imports: [SequelizeModule.forFeature([WatchListModel])],
  controllers: [WatchListController],
  providers: [WatchListService]
})
export class WatchListModule {}
