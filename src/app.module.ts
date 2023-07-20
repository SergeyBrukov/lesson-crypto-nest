import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import Configurations from "./configurations";
import { User } from "./user/model/user.model";
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { WatchListModule } from './watch-list/watch-list.module';
import { WatchListModel } from "./watch-list/model/watchList.model";

@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configurations]
    }),
    SequelizeModule.forRootAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: "postgres",
        host: configService.get("db_host"),
        port: configService.get("db_port"),
        username: configService.get("db_user"),
        password: configService.get("db_password"),
        database: configService.get("db_name"),
        synchronize: true,
        autoLoadModels: true,
        models: [User, WatchListModel]
      })
    }),
    AuthModule,
    TokenModule,
    WatchListModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
