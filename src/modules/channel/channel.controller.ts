import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  UsePipes,
  UseGuards,
  Req,
  Param,
  HttpCode,
  UseInterceptors,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JoiValidationPipe} from 'pipes/joi-validation.pipe'

import { HttpExceptionCode } from 'utils/http-exception-code.utils'
import { HttpErrorCode } from 'utils/enums/http-error-code.enum'

import { ChannelService } from './channel.service'
import { ChannelInterface } from './schemas/channel.interface'
import {
  CreateChannelJoi,
  UpdateChannelJoi,
  DeleteChannelJoi,
  FavoriteChannelJoi
} from './schemas/channel.joi'
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
      return await this.channelService.findOne(Number(params.id))
    } catch (error) {
      switch (error.message) {
        case HttpErrorCode.NOT_FOUND:
          throw new HttpExceptionCode(
            HttpStatus.NOT_FOUND,
            HttpErrorCode.NOT_FOUND,
            'Channel not found')
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
      return await this.channelService.update(Number(params.id), body, req.user)
    } catch (error) {
      switch (error.message) {
        case HttpErrorCode.NOT_FOUND:
          throw new HttpExceptionCode(
            HttpStatus.NOT_FOUND,
            HttpErrorCode.NOT_FOUND,
            'Channel not found')
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

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(DeleteChannelJoi))
  async delete(@Param() params, @Req() req) {
    try {
      return await this.channelService.delete(Number(params.id), req.user)
    } catch (error) {
      switch (error.message) {
        case HttpErrorCode.NOT_FOUND:
          throw new HttpExceptionCode(
            HttpStatus.NOT_FOUND,
            HttpErrorCode.NOT_FOUND,
            'Channel not found')
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

  @Patch(':id/favorite')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(FavoriteChannelJoi))
  async favorite(@Param() params, @Req() req) {
    try {
      return await this.channelService.favorite(Number(params.id), req.user)
    } catch (error) {
      switch (error.message) {
        case HttpErrorCode.NOT_FOUND:
          throw new HttpExceptionCode(
            HttpStatus.NOT_FOUND,
            HttpErrorCode.NOT_FOUND,
            'Channel not found')
          break

        default:
          throw new InternalServerErrorException()
      }
    }
  }
}
