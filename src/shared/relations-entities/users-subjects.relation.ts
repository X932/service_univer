import { SubjectsEntity } from '@modules/subjects/entities/subjects.entity';
import { UsersEntity } from '@modules/users/entities/users.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users_subjects')
export class UsersSubjectsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn()
  user: number;

  @ManyToOne(() => SubjectsEntity, (subject) => subject.id)
  @JoinColumn()
  subject: number;
}
