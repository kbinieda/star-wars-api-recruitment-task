import { Episode } from './contract';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'characters' })
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ type: 'json' })
  episodes: Array<Episode>;

  @Column({ nullable: true, length: 30, type: 'varchar' })
  planet?: string | null;
}
