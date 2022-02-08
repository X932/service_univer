import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('groups')
export class GroupsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
