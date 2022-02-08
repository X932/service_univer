import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersGroupsEntity } from '@relations-entities/users-groups.relation';

@Entity('groups')
export class GroupsEntity {
  @PrimaryGeneratedColumn()
  @ManyToOne(() => UsersGroupsEntity, (usersGroups) => usersGroups.group)
  id: number;

  @Column()
  title: string;
}
