import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
  HttpCode,
  HttpStatus,
  InternalServerErrorException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { JoiValidationPipe} from 'pipes/joi-validation.pipe'

import { HttpExceptionCode } from 'utils/http-exception-code.utils'
import constants from 'utils/constants'

import { UserService } from './user.service'
import { UserInterface } from './schemas/user.interface'
import { RegisterUserJoi, LoginUserJoi } from './schemas/user.joi'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(RegisterUserJoi))
  async register(@Body() body: UserInterface) {
    try {
      const user = await this.userService.register(body)
      return this.removeUnecessaryKeysFromUser(user)
    } catch (error) {

      switch (error.message) {
        case constants.codes.ALREADY_EXISTS:
          throw new HttpExceptionCode(
            HttpStatus.CONFLICT,
            constants.codes.ALREADY_EXISTS,
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
  async login(@Body() body: UserInterface) {
    try {
      const user = await this.userService.login(body)
      return this.removeUnecessaryKeysFromUser(user)
    } catch (error) {
      switch (error.message) {
        case constants.codes.NOT_FOUND:
          throw new HttpExceptionCode(
            HttpStatus.NOT_FOUND,
            constants.codes.NOT_FOUND,
            'User not found')
          break

        case constants.codes.INVALID_CREDENTIALS:
          throw new HttpExceptionCode(
            HttpStatus.UNAUTHORIZED,
            constants.codes.INVALID_CREDENTIALS,
            'Invalid credentials')
          break

        default:
          throw new InternalServerErrorException()
      }
    }
  }

  removeUnecessaryKeysFromUser = user => {
    const {
      password,
      createdAt,
      updatedAt,
      ...cleanUser } = user

    return cleanUser
  }
}
