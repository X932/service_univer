import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersDepartmentsEntity } from '@relations-entities/users-departments.relation';

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
}
