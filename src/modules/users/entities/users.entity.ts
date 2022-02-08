import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersDepartmentsEntity } from '@relations-entities/users-departments.relation';
import { UsersGroupsEntity } from '@relations-entities/users-groups.relation';
import { UsersRatingsEntity } from '@relations-entities/users-ratings.relation';
import { UsersRolesEntity } from '@relations-entities/users-roles.relation';
import { SubjectsEntity } from '@modules/subjects/entities/subjects.entity';

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
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @ManyToMany(() => SubjectsEntity, (subjects) => subjects.users)
  @JoinTable({
    name: 'users_subjects',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'subject_id',
      referencedColumnName: 'id',
    },
  })
  subjects: SubjectsEntity[];
}
