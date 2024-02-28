import { Userpost } from 'src/userpost/entities/userpost.entity';
import { UserProfile } from 'src/userprofile/entities/userprofile.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn,  } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  regNumber: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age:number;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => UserProfile, userProfile => userProfile.user,  { onDelete: 'CASCADE' }) 
  userProfile: UserProfile;

  @OneToMany(() => Userpost, post => post.user, { onDelete: 'CASCADE', cascade: true })
  posts: Userpost[];

  // Define many-to-many relationship with Userpost
  @ManyToMany(() => Userpost, userpost => userpost.likedByUsers, { onDelete: 'CASCADE', cascade: true })
  @JoinTable()
  likedPosts: Userpost[];

}


// So, UserProfile entity is being referenced in the relationship, 
// and the property user in UserProfile is used to define this relationship.
//  This implies that each record in the UserProfile entity can be associated with only one record in the current entity.