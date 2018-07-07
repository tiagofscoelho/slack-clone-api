import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JoiValidationPipe} from 'pipes/joi-validation.pipe'

import { UserService } from './user.service'
import { CreateUserDto } from './schemas/user.dto'
import { CreateUserJoi } from './schemas/user.joi'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateUserJoi))
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body)
  }
}
