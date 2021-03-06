import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersGroupsEntity } from '@relations-entities/users-groups.relation';
import { DepartmentsGroupsEntity } from '@relations-entities/departments-groups.relation';

@Entity('groups')
export class GroupsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => UsersGroupsEntity, (usersGroups) => usersGroups.group)
  usersGroups: UsersGroupsEntity[];

  @OneToOne(
    () => DepartmentsGroupsEntity,
    (departmentsGroups) => departmentsGroups.group,
  )
  departmentsGroups: DepartmentsGroupsEntity;
}
