import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersRatingsEntity } from '@relations-entities/users-ratings.relation';

@Entity('ratings')
export class RatingsEntity {
  @PrimaryGeneratedColumn()
  @OneToMany(() => UsersRatingsEntity, (usersRatings) => usersRatings.rating)
  id: number;

  @Column()
  week: number;

  @Column()
  value: number;
}
