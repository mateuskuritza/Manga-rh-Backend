import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('knowledges')
export class Knowledge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
