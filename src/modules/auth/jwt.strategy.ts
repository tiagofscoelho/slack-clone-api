import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from './schemas/jwt-payload.interface'

const cookieExtractor = (req) => {
  if (req && req.headers && req.headers.cookie && req.headers.cookie) {
    return req.headers.cookie.split('access_token=')[1]
  }
  return null
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: process.env.AUTH_USER_JWT_SECRET,
    })
  }

  async validate(payload: JwtPayload, done: (error, sucess) => any) {
    const user = await this.authService.validateUser(payload)

    if (!user) {
      return done(new UnauthorizedException(), false)
    }

    done(null, user)
  }
}