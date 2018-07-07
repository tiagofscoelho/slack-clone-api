import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes } from '@nestjs/common'
import { JoiValidationPipe} from 'pipes/joi-validation.pipe'

import { RoomService } from './room.service'
import { CreateRoomDto } from './schemas/room.dto'
import { CreateRoomJoi } from './schemas/room.joi'

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateRoomJoi))
  async create(@Body() body: CreateRoomDto) {
    return await this.roomService.create(body)
  }

  @Get()
  async findAll() {
    return await this.roomService.findAll()
  }
}
