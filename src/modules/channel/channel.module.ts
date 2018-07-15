
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChannelService } from './channel.service'
import { ChannelController } from './channel.controller'
import { Channel } from './channel.entity'
import { UserModule } from 'modules/user/user.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Channel]),
    UserModule
  ],
  providers: [ChannelService],
  controllers: [ChannelController],
})

export class ChannelModule {}
