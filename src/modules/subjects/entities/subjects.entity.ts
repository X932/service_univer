import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subjects')
export class SubjectsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
