import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { RoomModule } from './modules/room/room.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    RoomModule,
    UserModule
  ]
})

export class AppModule {}
