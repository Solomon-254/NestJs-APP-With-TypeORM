import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  regNumber: string

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age:number

  @Column({ default: true })
  isActive: boolean;
}
