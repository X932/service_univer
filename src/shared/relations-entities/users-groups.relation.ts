import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '@modules/users/entities/users.entity';
import { GroupsEntity } from '@modules/groups/entities/groups.entity';

@Entity('users_groups')
export class UsersGroupsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UsersEntity, (user) => user.usersGroups)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(() => GroupsEntity, (group) => group.usersGroups)
  @JoinColumn({ name: 'group_id' })
  group: GroupsEntity;
}
