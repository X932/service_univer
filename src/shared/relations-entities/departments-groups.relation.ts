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

  @ManyToOne(
    () => DepartmentsEntity,
    (departments) => departments.departmentsGroups,
  )
  @JoinColumn({ name: 'department_id' })
  department: DepartmentsEntity;

  @OneToOne(() => GroupsEntity, (groups) => groups.departmentsGroups)
  @JoinColumn({ name: 'group_id' })
  group: GroupsEntity;
}
