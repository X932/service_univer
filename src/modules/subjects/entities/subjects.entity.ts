import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '@modules/users/entities/users.entity';
import { DepartmentsEntity } from '@modules/departments/entities/departments.entity';
import { SubjectsRatingsEntity } from '@relations-entities/subjects-ratings.relation';

@Entity('subjects')
export class SubjectsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => SubjectsRatingsEntity,
    (subjectsRatings) => subjectsRatings.subject,
  )
  subjectsRatings: SubjectsRatingsEntity[];

  @Column()
  title: string;

  @ManyToMany(() => UsersEntity, (users) => users.subjects)
  users: UsersEntity[];

  @ManyToMany(() => DepartmentsEntity, (departmets) => departmets.subjects)
  departments: DepartmentsEntity[];
}
