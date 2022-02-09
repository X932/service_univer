import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DepartmentsEntity } from '@modules/departments/entities/departments.entity';
import { GroupsEntity } from '@modules/groups/entities/groups.entity';

@Entity('departments_groups')
export class DepartmentsGroupsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DepartmentsEntity, (departments) => departments.id)
  @JoinColumn({ name: 'department_id' })
  department: number;

  @OneToOne(() => GroupsEntity, (groups) => groups.id)
  @JoinColumn({ name: 'group_id' })
  group: number;
}
