import { getCustomRepository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Channel } from './channel.entity'
import { ChannelInterface } from './schemas/channel.interface'
import { ChannelRepository } from './channel.repository'
import { UserInterface } from 'modules/user/schemas/user.interface'
import { HttpErrorCode } from 'utils/enums/http-error-code.enum'
import { omitBy, isUndefined } from 'lodash'
import { User } from '../user/user.entity';

@Injectable()
export class ChannelService {

  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository
  ) {
    this.channelRepository = getCustomRepository(ChannelRepository)
  }

  async create(data: ChannelInterface, user: UserInterface) {
    return await this.channelRepository.createAndSave(data, user)
  }

  async findAll(req): Promise<Channel[]> {
    return await this.channelRepository.find({ createdBy: req.user.id })
  }

  async findOne(id: number): Promise<Channel> {
    const channel = await this.channelRepository.findOneDetailed(id)

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
}