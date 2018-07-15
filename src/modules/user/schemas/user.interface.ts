import { Channel } from 'modules/channel/channel.entity'

export class UserInterface {
  readonly id: number
  readonly firstName: string
  readonly lastName: string
  readonly email: string
  readonly password: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly createdChannels: Array<Channel>
  readonly favoriteChannels: Array<Channel>
}