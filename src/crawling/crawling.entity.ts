import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Crawling extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  currentTime: Date;
}
