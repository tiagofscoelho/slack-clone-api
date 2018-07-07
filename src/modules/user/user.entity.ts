import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

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
    length: 128
  })
  email: string

  @Column({
    length: 128
  })
  password: string

  @CreateDateColumn({
    type: 'timestamp'
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp'
  })
  updatedAt: Date
}