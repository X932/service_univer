import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '@modules/users/entities/users.entity';
import { DepartmentsEntity } from '@modules/departments/entities/departments.entity';

@Entity('users_departments')
export class UsersDepartmentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UsersEntity, (user) => user.usersDepartments)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(
    () => DepartmentsEntity,
    (department) => department.usersDepartments,
  )
  @JoinColumn({ name: 'department_id' })
  department: DepartmentsEntity;
}
