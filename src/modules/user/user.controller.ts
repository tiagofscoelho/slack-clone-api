import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  UseInterceptors,
  Req
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { JoiValidationPipe} from 'pipes/joi-validation.pipe'

import { HttpExceptionCode } from 'utils/http-exception-code.utils'
import { HttpErrorCode } from 'utils/enums/http-error-code.enum'

import { JwtInterceptor } from 'modules/auth/jwt.interceptor'
import { UserService } from './user.service'
import { UserInterface } from './schemas/user.interface'
import { RegisterUserJoi, LoginUserJoi } from './schemas/user.joi'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(RegisterUserJoi))
  @UseInterceptors(JwtInterceptor)
  async register(@Body() body: UserInterface, @Req() req) {
    try {
      const user = await this.userService.register(body)
      req.user = user
      return this.userService.removeUnecessaryKeysFromUser(user)
    } catch (error) {

      switch (error.message) {
        case HttpErrorCode.ALREADY_EXISTS:
          throw new HttpExceptionCode(
            HttpStatus.CONFLICT,
            HttpErrorCode.ALREADY_EXISTS,
            'Email already exists')
          break

        default:
          throw new InternalServerErrorException()
      }
    }
  }

  @Post('/login')
  @HttpCode(200)
  @UsePipes(new JoiValidationPipe(LoginUserJoi))
  @UseInterceptors(JwtInterceptor)
  async login(@Body() body: UserInterface, @Req() req) {
    try {
      const user = await this.userService.login(body)
      req.user = user
      return this.userService.removeUnecessaryKeysFromUser(user)
    } catch (error) {
      switch (error.message) {
        case HttpErrorCode.NOT_FOUND:
          throw new HttpExceptionCode(
            HttpStatus.NOT_FOUND,
            HttpErrorCode.NOT_FOUND,
            'User not found')
          break

        case HttpErrorCode.INVALID_CREDENTIALS:
          throw new HttpExceptionCode(
            HttpStatus.UNAUTHORIZED,
            HttpErrorCode.INVALID_CREDENTIALS,
            'Invalid credentials')
          break

        default:
          throw new InternalServerErrorException()
      }
    }
  }
}
