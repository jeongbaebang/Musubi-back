import { Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Crawling extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
