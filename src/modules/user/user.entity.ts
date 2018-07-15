import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable
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
    length: 128,
    select: false
  })
  password: string

  @OneToMany(type => Channel, channel => channel.createdBy)
  createdChannels: Channel[]

  @ManyToMany(type => Channel)
  @JoinTable({ name: 'favorite_channels'})
  favoriteChannels: Channel[]

  @CreateDateColumn({
    type: 'timestamp'
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp'
  })
  updatedAt: Date
}