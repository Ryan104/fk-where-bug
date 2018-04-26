import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity('Photos')
export class Photo {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  description: string;
  
  @Column()
  uri: string;

  @Column()
  userId: number;

  @ManyToOne(type => User, user => user.photos)
  user: User;

}