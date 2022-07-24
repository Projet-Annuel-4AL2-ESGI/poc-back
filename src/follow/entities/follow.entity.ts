import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('follows')
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  follower: number;

  @Column({ type: 'int', nullable: false })
  following: number;
}
