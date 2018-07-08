import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Req,
  UseInterceptors } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JoiValidationPipe} from 'pipes/joi-validation.pipe'

import { ChannelService } from './channel.service'
import { ChannelInterface } from './schemas/channel.interface'
import { CreateChannelJoi } from './schemas/channel.joi'
import { JwtInterceptor } from 'modules/auth/jwt.interceptor'

@Controller('channel')
@UseInterceptors(JwtInterceptor)
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(CreateChannelJoi))
  async create(@Body() body: ChannelInterface) {
    return await this.channelService.create(body)
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() req) {
    return await this.channelService.findAll()
  }
}
