import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { ChannelModule } from './modules/channel/channel.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    ChannelModule
  ]
})

export class AppModule {}
