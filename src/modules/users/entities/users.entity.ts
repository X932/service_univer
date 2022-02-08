import { UsersDepartmentsEntity } from '@relations-entities/users-departments.relation';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  @OneToMany(
    () => UsersDepartmentsEntity,
    (usersDepartments) => usersDepartments.user,
  )
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;
}
