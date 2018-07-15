import { getCustomRepository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Channel } from './channel.entity'
import { ChannelInterface } from './schemas/channel.interface'
import { ChannelRepository } from './channel.repository'
import { UserInterface } from 'modules/user/schemas/user.interface'
import { UserService } from 'modules/user/user.service'
import { HttpErrorCode } from 'utils/enums/http-error-code.enum'
import { omitBy, isUndefined, cloneDeep, findIndex, differenceBy } from 'lodash'

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository,
    private readonly userService: UserService
  ) {
    this.channelRepository = getCustomRepository(ChannelRepository)
  }

  async create(data: ChannelInterface, user: UserInterface) {
    return await this.channelRepository.createAndSave(data, user)
  }

  async findAll(req) {
    try {
      let userChannels = await this.channelRepository.findUserChannels(req.user.id)
      const { favoriteChannels } = await this.userService.getByEmail(req.user.email, true)

      // Remove favorite channels from the list of user channels
      userChannels = differenceBy(userChannels, favoriteChannels, 'id')

      // Remove users information from user channels
      userChannels = userChannels.map(({ users, ...attributes}) => attributes)

      return {
        favorites: favoriteChannels,
        channels: userChannels
      }
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number): Promise<Channel> {
    const channel = await this.channelRepository.findOneDetailed(id)

    if (channel) {
      return channel
    } else {
      throw new Error(HttpErrorCode.NOT_FOUND)
    }
  }

  async findOneWithUser(channeId: number, userId: number) {
    const channel = await this.channelRepository.findOneWithUser(channeId, userId)

    if (channel) {
      return channel
    } else {
      throw new Error(HttpErrorCode.NOT_FOUND)
    }
  }

  async update(id: number, data: ChannelInterface, user: UserInterface) {
    const channel = await this.findOne(id)

    try {
      if (channel.createdBy.id === user.id) {
        const newData = {
          ...channel,
          ...omitBy(data, isUndefined)
        }

        return await this.channelRepository.save(newData)
      } else {
        throw new Error(HttpErrorCode.INVALID_PERMISSIONS)
      }
    } catch (error) {
      throw error
    }
  }

  async delete(id, user) {
    const channel = await this.findOne(id)

    try {
      if (channel.createdBy.id === user.id) {
        return await this.channelRepository.remove(channel)
      } else {
        throw new Error(HttpErrorCode.INVALID_PERMISSIONS)
      }
    } catch (error) {
      throw error
    }
  }

  async favorite(id: number, user: UserInterface) {
    const channel = await this.findOneWithUser(id, user.id)

    try {
      const completedUser = await this.userService.getByEmail(user.email, true)
      const favoriteChannels = cloneDeep(completedUser.favoriteChannels)
      const favoriteChannelIndex = findIndex(favoriteChannels, element => element.id === id)

      if (favoriteChannelIndex > -1) {
        favoriteChannels.splice(favoriteChannelIndex, 1)
      } else {
        favoriteChannels.unshift(channel)
      }

      this.userService.saveUser({
        ...completedUser,
        favoriteChannels
      })
    } catch (error) {
      throw error
    }
  }
}