import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '@modules/users/entities/users.entity';
import { DepartmentsEntity } from '@modules/departments/entities/departments.entity';

@Entity('users_departments')
export class UsersDepartmentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn()
  user: number;

  @ManyToOne(() => DepartmentsEntity, (department) => department.id)
  @JoinColumn()
  department: number;
}
