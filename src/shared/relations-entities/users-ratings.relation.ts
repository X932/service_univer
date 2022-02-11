import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RatingsEntity } from '@modules/ratings/entities/ratings.entity';
import { UsersEntity } from '@modules/users/entities/users.entity';

@Entity('users_ratings')
export class UsersRatingsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.usersRatings)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @OneToOne(() => RatingsEntity, (rating) => rating.usersRatings)
  @JoinColumn({ name: 'rating_id' })
  rating: RatingsEntity;
}
