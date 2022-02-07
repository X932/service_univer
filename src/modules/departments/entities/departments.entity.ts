import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('departments')
export class DepartmentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}