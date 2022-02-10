import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersGroupsEntity } from '@relations-entities/users-groups.relation';
import { DepartmentsGroupsEntity } from '@relations-entities/departments-groups.relation';

@Entity('groups')
export class GroupsEntity {
  @PrimaryGeneratedColumn()
  @ManyToOne(() => UsersGroupsEntity, (usersGroups) => usersGroups.group)
  id: number;

  @Column()
  title: string;

  @OneToOne(
    () => DepartmentsGroupsEntity,
    (departmentsGroups) => departmentsGroups.group,
  )
  departmentsGroups: DepartmentsGroupsEntity;
}
