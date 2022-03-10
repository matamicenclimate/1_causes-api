import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class Cause {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  imageUrl: string

  @Column()
  date: Date
}