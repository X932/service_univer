import { UsersSubjectsEntity } from '@relations-entities/users-subjects.relation';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subjects')
export class SubjectsEntity {
  @PrimaryGeneratedColumn()
  @OneToMany(() => UsersSubjectsEntity, (usersSubject) => usersSubject.subject)
  id: number;

  @Column()
  title: string;
}
