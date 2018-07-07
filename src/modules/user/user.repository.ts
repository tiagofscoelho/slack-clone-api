import { EntityRepository, Repository } from 'typeorm'
import { User } from './user.entity'
import { UserInterface } from './schemas/user.interface'
import { PasswordManager } from 'utils/password-manager'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private passwordManager

  constructor() {
    super()
    this.passwordManager = new PasswordManager()
  }

  async createAndSave(data: UserInterface) {
    const user = new User()
    user.firstName = data.firstName
    user.lastName = data.lastName
    user.email = data.email
    user.password = await this.passwordManager.generatePasswordHash(data.password)
    return this.save(user)
  }

  findByEmail(email: string) {
      return this.findOne({ email })
  }
}