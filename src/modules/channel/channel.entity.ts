import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 64
  })
  name: string

  @Column({
    length: 255,
    nullable: true
  })
  purpose: string

  @Column({
    default: true
  })
  private: boolean

  @CreateDateColumn({
    type: 'timestamp'
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp'
  })
  updatedAt: Date
}