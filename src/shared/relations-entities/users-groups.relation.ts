import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '@modules/users/entities/users.entity';
import { GroupsEntity } from '@modules/groups/entities/groups.entity';

@Entity('users_groups')
export class UsersGroupsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @ManyToOne(() => GroupsEntity, (group) => group.id)
  @JoinColumn({ name: 'group_id' })
  group: number;
}
