import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Req,
  Param,
  UseInterceptors,
  HttpStatus,
  InternalServerErrorException,
  Patch
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JoiValidationPipe} from 'pipes/joi-validation.pipe'

import { HttpExceptionCode } from 'utils/http-exception-code.utils'
import { HttpErrorCode } from 'utils/enums/http-error-code.enum'

import { ChannelService } from './channel.service'
import { ChannelInterface } from './schemas/channel.interface'
import { CreateChannelJoi, UpdateChannelJoi } from './schemas/channel.joi'
import { JwtInterceptor } from 'modules/auth/jwt.interceptor'

@Controller('channel')
@UseInterceptors(JwtInterceptor)
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(CreateChannelJoi))
  async create(@Body() body: ChannelInterface, @Req() req) {
    return await this.channelService.create(body, req.user)
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() req) {
    return await this.channelService.findAll(req)
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param() params) {
    try {
      return await this.channelService.findOne(params.id)
    } catch (error) {
      switch (error.message) {
        case HttpErrorCode.NOT_FOUND:
          throw new HttpExceptionCode(
            HttpStatus.NOT_FOUND,
            HttpErrorCode.NOT_FOUND,
            'User not found')
          break

        default:
          throw new InternalServerErrorException()
      }
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(UpdateChannelJoi))
  async update(@Param() params, @Body() body, @Req() req) {
    try {
      return await this.channelService.update(params.id, body, req.user)
    } catch (error) {
      switch (error.message) {
        case HttpErrorCode.NOT_FOUND:
          throw new HttpExceptionCode(
            HttpStatus.NOT_FOUND,
            HttpErrorCode.NOT_FOUND,
            'User not found')
          break

        case HttpErrorCode.INVALID_PERMISSIONS:
            throw new HttpExceptionCode(
              HttpStatus.FORBIDDEN,
              HttpErrorCode.INVALID_PERMISSIONS,
              'Invalid permissions for resource')
            break

        default:
          throw new InternalServerErrorException()
      }
    }
  }
}
