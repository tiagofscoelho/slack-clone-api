import * as jwt from 'jsonwebtoken'
import { Injectable } from '@nestjs/common'
import { JwtPayload } from './schemas/jwt-payload.interface'
import constants from 'utils/constants'

@Injectable()
export class AuthService {
  // constructor(private readonly usersService: UsersService) {}

  async createToken(email: string) {
    const user: JwtPayload = { email }
    const jwtOptions = { expiresIn: constants.auth.JWT_EXPIRATION }

    const accessToken = jwt.sign(
      user,
      process.env.AUTH_USER_JWT_SECRET,
      jwtOptions)

    return {
      expiresIn: jwtOptions.expiresIn,
      accessToken
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // TODO: after add User module
    return false
  }
}