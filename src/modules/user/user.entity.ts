import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'

import { Channel } from 'modules/channel/channel.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 64
  })
  firstName: string

  @Column({
    length: 64,
    nullable: true
  })
  lastName: string

  @Column({
    length: 128,
    unique: true
  })
  email: string

  @Column({
  length: 128
  })
  password: string

  @OneToMany(type => Channel, channel => channel.createdBy)
  createdChannels: Channel[]

  @CreateDateColumn({
    type: 'timestamp'
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp'
  })
  updatedAt: Date
}