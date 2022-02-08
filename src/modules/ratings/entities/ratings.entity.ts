import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ratings')
export class RatingsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  week: number;

  @Column()
  value: number;
}
