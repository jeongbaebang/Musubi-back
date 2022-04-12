import {
  Column,
  Entity,
  Unique,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'TMI_USER_M' })
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'N_USER_NO' })
  id: number;

  @CreateDateColumn({ name: 'D_REG_DTM' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'D_MOD_DTM' })
  updatedAt: Date;

  @Column({ name: 'V_EMAIL' })
  username: string;

  @Column({ name: 'V_PASSWORD' })
  password: string;
}
