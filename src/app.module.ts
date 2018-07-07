import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { RoomModule } from './modules/room/room.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    RoomModule
  ]
})

export class AppModule {}
