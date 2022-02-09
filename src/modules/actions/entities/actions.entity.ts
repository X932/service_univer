import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('actions')
export class ActionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}
