import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersRatingsEntity } from '@relations-entities/users-ratings.relation';

@Entity('ratings')
export class RatingsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  week: number;

  @Column()
  value: number;

  @OneToOne(() => UsersRatingsEntity, (usersRatings) => usersRatings.rating)
  usersRatings: UsersRatingsEntity;
}
