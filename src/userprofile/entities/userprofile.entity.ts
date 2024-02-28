import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';// Import the User entity


@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  profileInfo: string;

  @Column()
  email:string

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "userId" })
  user: User;
}
