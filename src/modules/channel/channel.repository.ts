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

  async findOneDetailed(id: number) {
    return await this.findOne({ id }, {
      relations: ['createdBy', 'users']
    })
  }

  async findOneWithUser(channelId: number, userId: number) {
    return await this.createQueryBuilder('channel')
      .innerJoinAndSelect('channel.users', 'user', 'user.id = :userId', { userId })
      .where('channel.id = :channelId', { channelId })
      .getOne()
  }

  async findUserChannels(userId: number) {
    try {
      return await this.createQueryBuilder('channel')
        .innerJoinAndSelect('channel.users', 'user', 'user.id = :userId', { userId })
        .getMany()
    } catch (error) {
      throw error
    }
  }
}