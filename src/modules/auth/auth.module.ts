import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { UserModule } from 'modules/user/user.module'

@Module({
  imports: [
    UserModule
  ],
  providers: [
    AuthService,
    JwtStrategy
  ]
})

export class AuthModule {}