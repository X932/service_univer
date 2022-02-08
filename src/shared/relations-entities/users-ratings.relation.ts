import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RatingsEntity } from '@modules/ratings/entities/ratings.entity';
import { UsersEntity } from '@modules/users/entities/users.entity';

@Entity('users_ratings')
export class UsersRatingsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn()
  user: number;

  @ManyToOne(() => RatingsEntity, (rating) => rating.id)
  @JoinColumn()
  rating: number;
}