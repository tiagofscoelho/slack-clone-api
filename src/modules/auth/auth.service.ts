import * as jwt from 'jsonwebtoken'
import { Injectable } from '@nestjs/common'
import { JwtPayload } from './schemas/jwt-payload.interface'
import constants from 'utils/constants'

@Injectable()
export class AuthService {
  createToken(email: string): object {
    const user: JwtPayload = { email }
    const jwtOptions = { expiresIn: constants.auth.JWT_EXPIRATION }
    const accessToken = jwt.sign(
      user,
      process.env.AUTH_USER_JWT_SECRET,
      jwtOptions)

    return accessToken
  }

  validateUser({ email }: JwtPayload): object {
    return {
      email
    }
  }
}