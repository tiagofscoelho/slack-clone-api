import { UserInterface } from 'modules/user/schemas/user.interface'

export class ChannelInterface {
  readonly name: string
  readonly private: boolean
  readonly purpose: string
  readonly createdB: UserInterface
}