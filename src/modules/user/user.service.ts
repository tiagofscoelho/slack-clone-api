import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { CreateUserDto } from './schemas/user.dto'
import { PasswordEncrypt } from 'utils/password-encrypt'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(user: CreateUserDto) {
    const newUser = new User()
    newUser.firstName = user.firstName
    newUser.lastName = user.lastName
    newUser.email = user.email
    newUser.password = await new PasswordEncrypt().generatePasswordHash(user.password)

    return await this.userRepository.save(newUser)
  }
}