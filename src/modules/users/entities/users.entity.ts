import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersDepartmentsEntity } from '@relations-entities/users-departments.relation';
import { UsersGroupsEntity } from '@relations-entities/users-groups.relation';
import { UsersRatingsEntity } from '@relations-entities/users-ratings.relation';
import { SubjectsEntity } from '@modules/subjects/entities/subjects.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @OneToMany(() => UsersRatingsEntity, (usersRatings) => usersRatings.user)
  usersRatings: UsersRatingsEntity[];

  @OneToOne(() => UsersGroupsEntity, (usersGroups) => usersGroups.user)
  usersGroups: UsersGroupsEntity;

  @OneToOne(
    () => UsersDepartmentsEntity,
    (usersDepartments) => usersDepartments.user,
  )
  usersDepartments: UsersDepartmentsEntity;

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
