import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RolesEntity } from '@modules/roles/entities/roles.entity';
import { UsersEntity } from '@modules/users/entities/users.entity';

@Entity('users_roles')
export class UsersRolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UsersEntity, (user) => user.usersRoles)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(() => RolesEntity, (role) => role.usersRoles)
  @JoinColumn({ name: 'role_id' })
  role: RolesEntity;
}
