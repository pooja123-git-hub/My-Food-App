import { BaseEntity, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        type:'varchar',
        length:100,
        default:null,
    })
    name:string

    @Column({
        type:'boolean',
        default:false,
        nullable:true,
    })
    is_admin:boolean

    
    @Column({
      type: 'timestamptz',
      default: null,
    })
    created_at: Date;
  
    @Column({
      type: 'timestamptz',
      default: null,
    })
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;

    @Column('jsonb', { nullable: true })
    permissions: string[];
}