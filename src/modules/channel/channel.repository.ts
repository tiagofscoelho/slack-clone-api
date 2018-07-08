import { EntityRepository, Repository } from 'typeorm'
import { Channel } from './channel.entity'
import { ChannelInterface } from './schemas/channel.interface'
import { UserInterface } from 'modules/user/schemas/user.interface'

@EntityRepository(Channel)
export class ChannelRepository extends Repository<Channel> {

  async createAndSave(data: ChannelInterface, user: UserInterface) {
    const channel = new Channel()
    channel.name = data.name
    channel.purpose = data.purpose
    channel.private = data.private
    channel.createdBy = user
    channel.users = [user]

    return this.save(channel)
  }
}