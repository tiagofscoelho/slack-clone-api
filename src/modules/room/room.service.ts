import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Room } from './room.entity'
import { CreateRoomDto } from './schemas/room.dto'

@Injectable()
export class RoomService {

  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>
  ) {}

  async create(room: CreateRoomDto) {
    const newRoom = new Room()
    newRoom.name = room.name
    newRoom.private = room.private
    newRoom.purpose = room.purpose

    return await this.roomRepository.save(room)
  }

  async findAll(): Promise<Room[]> {
    return await this.roomRepository.find()
  }
}