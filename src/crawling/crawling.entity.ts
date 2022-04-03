import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'TMI_OTH_PRJ_M' })
export class TMI_OTH_PRJ_M extends BaseEntity {
  @PrimaryColumn()
  V_OTH_PRJ_ID: string;

  @Column()
  V_OTH_TITLE: string;

  @Column('mediumtext')
  T_OTH_CONTENT: string;

  @Column('char')
  V_SITE_GUBUN: string;

  @Column()
  V_OTH_URL: string;

  @Column()
  V_REG_NM: string;

  @Column()
  D_REG_DTM: Date;
}
