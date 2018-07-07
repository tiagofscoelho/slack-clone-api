import {getCustomRepository} from 'typeorm'
import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { User } from './user.entity'
import { UserInterface } from './schemas/user.interface'
import { PasswordManager } from 'utils/password-manager'
import constants from 'utils/constants'

@Injectable()
export class UserService {
  private passwordManager

  constructor(
    @InjectRepository(User)
    private readonly userRepository
  ) {
    this.passwordManager = new PasswordManager()
    this.userRepository = getCustomRepository(UserRepository)
  }

  async register(data: UserInterface) {

    try {
      return await this.userRepository.createAndSave(data)
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        throw new Error(constants.codes.ALREADY_EXISTS)
      } else {
        throw error
      }

    }
  }

  async login(data: UserInterface): Promise<UserInterface> {
    try {
      const user = await this.userRepository.findOne({ email: data.email })

      if (user) {
        const isPasswordValid = await this.passwordManager.validatePassword(data.password, user.password)

        if (isPasswordValid) {
          return user
        } else {
          throw new Error(constants.codes.INVALID_CREDENTIALS)
        }
      } else {
        throw new Error(constants.codes.NOT_FOUND)
      }
    } catch (error) {
      throw error
    }
  }
}