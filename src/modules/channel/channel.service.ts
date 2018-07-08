import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Channel } from './channel.entity'
import { CreateChannelDto } from './schemas/channel.dto'

@Injectable()
export class ChannelService {

  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>
  ) {}

  async create(channel: CreateChannelDto) {
    const newChannel = new Channel()
    newChannel.name = channel.name
    newChannel.private = channel.private
    newChannel.purpose = channel.purpose

    return await this.channelRepository.save(newChannel)
  }

  async findAll(): Promise<Channel[]> {
    return await this.channelRepository.find()
  }
}