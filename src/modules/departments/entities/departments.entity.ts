import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersDepartmentsEntity } from '@relations-entities/users-departments.relation';
import { SubjectsEntity } from '@modules/subjects/entities/subjects.entity';

@Entity('departments')
export class DepartmentsEntity {
  @PrimaryGeneratedColumn()
  @OneToMany(
    () => UsersDepartmentsEntity,
    (usersDepartments) => usersDepartments.department,
  )
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => SubjectsEntity, (subjects) => subjects.departments)
  @JoinTable({
    name: 'departments_subjects',
    joinColumn: {
      name: 'department_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'subject_id',
      referencedColumnName: 'id',
    },
  })
  subjects: SubjectsEntity[];
}
