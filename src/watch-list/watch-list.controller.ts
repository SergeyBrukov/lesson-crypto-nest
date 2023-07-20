import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common";
import { WatchListService } from './watch-list.service';
import { CreateWatchListDto } from './dto/create-watch-list.dto';
import { UpdateWatchListDto } from './dto/update-watch-list.dto';
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiTags } from "@nestjs/swagger";

@ApiTags("watch-list")
@Controller('watch-list')
export class WatchListController {
  constructor(private readonly watchListService: WatchListService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: CreateWatchListDto
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>"
  })
  @Post('create-asset')
  createAsset(@Body() createWatchListDto: CreateWatchListDto, @Req() request) {
    return this.watchListService.createAsset(createWatchListDto, request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiHeader({
    name: "Authorization",
    description: "Bearer <token>"
  })
  remove(@Param('id') id: string, @Req() request) {
    const {id: userId} = request.user;
    return this.watchListService.remove(+id, +userId);
  }
}
