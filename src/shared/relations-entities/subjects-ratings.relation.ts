import { RatingsEntity } from '@modules/ratings/entities/ratings.entity';
import { SubjectsEntity } from '@modules/subjects/entities/subjects.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('subjects_ratings')
export class SubjectsRatingsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SubjectsEntity, (subjects) => subjects.subjectsRatings)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectsEntity;

  @OneToOne(() => RatingsEntity)
  @JoinColumn({ name: 'rating_id' })
  rating: RatingsEntity;
}
