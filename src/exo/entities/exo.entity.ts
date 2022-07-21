import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('exos')
export class Exo {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  rules: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  exoResponse: string;

  @Column({ type: 'varchar', nullable: false })
  exoCheck: string;

  @Column({ type: 'varchar', nullable: false })
  language: string;
}
