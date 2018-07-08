import * as jwt from 'jsonwebtoken'
import { Injectable } from '@nestjs/common'
import { JwtPayload } from './schemas/jwt-payload.interface'
import constants from 'utils/constants'
import { UserService } from 'modules/user/user.service'
import { UserInterface } from 'modules/user/schemas/user.interface'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  createToken(email: string): object {
    const user: JwtPayload = { email }
    const jwtOptions = { expiresIn: constants.auth.JWT_EXPIRATION }
    const accessToken = jwt.sign(
      user,
      process.env.AUTH_USER_JWT_SECRET,
      jwtOptions)

    return accessToken
  }

  async validateUser({ email }: JwtPayload): Promise<UserInterface>{
    const user = await this.userService.getByEmail(email)
    return this.userService.removeUnecessaryKeysFromUser(user)
  }
}