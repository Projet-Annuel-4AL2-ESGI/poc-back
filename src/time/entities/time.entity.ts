import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('times')
export class Time {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  userId!: number;

  @Column({ type: 'int', nullable: false })
  exerciseId!: number;

  @Column({ type: 'float', nullable: false })
  time!: number;
}
