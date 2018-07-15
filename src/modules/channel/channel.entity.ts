import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  getManager,
  BeforeUpdate
} from 'typeorm'

import { User } from 'modules/user/user.entity'
import { UserInterface } from '../user/schemas/user.interface'

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 24
  })
  name: string

  @Column({
    length: 128,
    nullable: true
  })
  purpose: string

  @Column({
    default: true
  })
  private: boolean

  @ManyToOne(type => User, user => user.createdChannels)
  @JoinColumn({ name: 'createdBy' })
  createdBy: UserInterface

  @ManyToMany(type => User)
  @JoinTable({ name: 'channel_users'})
  users: UserInterface[]

  @CreateDateColumn({
    type: 'timestamp'
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp'
  })
  updatedAt: Date

  // Hooks
  @BeforeUpdate()
  updateDates() {
    // TODO: guarantee that private is a boolean
  }
}