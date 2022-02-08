import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teachers')
export class TeachersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;
}
