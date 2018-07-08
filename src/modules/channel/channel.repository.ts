import { EntityRepository, Repository } from 'typeorm'
import { Channel } from './channel.entity'
import { ChannelInterface } from './schemas/channel.interface'

@EntityRepository(Channel)
export class ChannelRepository extends Repository<Channel> {

  async createAndSave(data: ChannelInterface) {
    const channel = new Channel()
    channel.name = data.name
    channel.purpose = data.purpose
    channel.private = data.private
    return this.save(channel)
  }
}