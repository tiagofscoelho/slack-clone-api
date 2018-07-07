import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JoiValidationPipe} from 'pipes/joi-validation.pipe'

import { RoomService } from './room.service'
import { CreateRoomDto } from './schemas/room.dto'
import { CreateRoomJoi } from './schemas/room.joi'

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(CreateRoomJoi))
  async create(@Body() body: CreateRoomDto) {
    return await this.roomService.create(body)
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return await this.roomService.findAll()
  }
}
