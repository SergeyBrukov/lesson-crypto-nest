import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { WatchListModel } from "../../watch-list/model/watchList.model";

@Table
export class User extends Model  {
  @Column
  firstName: string

  @Column
  userName: string

  @Column
  email: string

  @Column
  password: string

  @HasMany(() => WatchListModel, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  watchList: WatchListModel[]
}