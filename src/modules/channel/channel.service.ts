import { getCustomRepository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Channel } from './channel.entity'
import { ChannelInterface } from './schemas/channel.interface'
import { ChannelRepository } from './channel.repository'
import { UserInterface } from 'modules/user/schemas/user.interface'

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
}