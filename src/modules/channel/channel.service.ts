import { getCustomRepository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Channel } from './channel.entity'
import { ChannelInterface } from './schemas/channel.interface'
import { ChannelRepository } from './channel.repository'
import { UserInterface } from 'modules/user/schemas/user.interface'
import { HttpErrorCode } from 'utils/enums/http-error-code.enum'
import { pickBy, identity } from 'lodash'

@Injectable()
export class ChannelService {

  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository
  ) {
    this.channelRepository = getCustomRepository(ChannelRepository)
  }

  async create(channel: ChannelInterface, user: UserInterface) {
    return await this.channelRepository.createAndSave(channel, user)
  }

  async findAll(req): Promise<Channel[]> {
    return await this.channelRepository.find({ createdBy: req.user.id })
  }

  async findOne(id): Promise<Channel> {
    const channel = await this.channelRepository.findOne({ id }, {
      relations: ['createdBy', 'users']
    })

    if (channel) {
      return channel
    } else {
      throw new Error(HttpErrorCode.NOT_FOUND)
    }
  }

  async update(id, data, user) {
    const channel = await this.findOne(id)

    try {
      if (channel.createdBy.id === user.id) {
        const newData = {
          ...channel,
          ...pickBy(data, identity)
        }

        console.log('typeof: ', typeof data.private)
        console.log('typeof newData: ', typeof newData.private)

        return await this.channelRepository.save(newData)
      } else {
        throw new Error(HttpErrorCode.INVALID_PERMISSIONS)
      }
    } catch (error) {
      throw error
    }
  }
}