import { Column, ForeignKey, Model, Table, Unique } from "sequelize-typescript";
import { User } from "../../user/model/user.model";

@Table
export class WatchListModel extends Model {
  @ForeignKey(() => User)
  user: User;

  @Column
  name: string;

  @Column
  assetId: string;
}