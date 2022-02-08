import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEntity } from '@modules/roles/entities/roles.entity';
import { UsersEntity } from '@modules/users/entities/users.entity';

@Entity('users_roles')
export class UsersRolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn()
  user: number;

  @ManyToOne(() => RolesEntity, (role) => role.id)
  @JoinColumn()
  role: number;
}