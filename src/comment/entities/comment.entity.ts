import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column({ type: 'int', nullable: false })
  postId: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'varchar', nullable: false })
  commentMessage: string;
}
