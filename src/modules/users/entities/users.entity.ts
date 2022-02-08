import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersDepartmentsEntity } from '@relations-entities/users-departments.relation';
import { UsersGroupsEntity } from '@relations-entities/users-groups.relation';
import { UsersRatingsEntity } from '@relations-entities/users-ratings.relation';
import { UsersRolesEntity } from '@relations-entities/users-roles.relation';
import { UsersSubjectsEntity } from '@relations-entities/users-subjects.relation';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  @OneToMany(
    () => UsersDepartmentsEntity,
    (usersDepartments) => usersDepartments.user,
  )
  @OneToMany(() => UsersGroupsEntity, (usersGroups) => usersGroups.user)
  @OneToMany(() => UsersRatingsEntity, (usersRatings) => usersRatings.user)
  @OneToMany(() => UsersRolesEntity, (usersRoles) => usersRoles.user)
  @OneToMany(() => UsersSubjectsEntity, (usersSubjects) => usersSubjects.user)
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  nickname: string;

  @Column()
  password: string;
}
