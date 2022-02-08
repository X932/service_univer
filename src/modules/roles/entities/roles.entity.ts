import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersRolesEntity } from '@relations-entities/users-roles.relation';

@Entity('roles')
export class RolesEntity {
  @PrimaryGeneratedColumn()
  @OneToMany(() => UsersRolesEntity, (usersRoles) => usersRoles.role)
  id: number;

  @Column()
  title: string;
}
