import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 64 })
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
}