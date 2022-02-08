import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '@modules/users/entities/users.entity';

@Entity('subjects')
export class SubjectsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => UsersEntity, (users) => users.subjects)
  users: UsersEntity[];
}
