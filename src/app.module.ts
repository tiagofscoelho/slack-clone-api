import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { RoomModule } from './modules/room/room.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RoomModule
  ],
  controllers: [
    AppController
  ],
  providers: [AppService]
})

export class AppModule {}
