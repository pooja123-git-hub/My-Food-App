import { BaseEntity, Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Gender } from "../enums/gender.enums";
import { UserRole } from "../enums/role.enums";
import { Status } from "./status.entity";
import { Role } from "src/role/database/role.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:'varchar',
        length:255,
        nullable:false,
    })
    full_name:string;

    @Column({ 
        type:'varchar',
        length:255,
        nullable:false,
    })
    email:string;

    @Column({
        type:'varchar',
        length:255,
        nullable:false,
    })
    password:string;

     @Column({
    type: 'varchar',
    default: null,
    nullable: true
  })
  mobile: string;

    @Column({
    type: 'enum',
    enum: Gender,
    default: null,
    nullable: true
  })
  gender: Gender;

  @Column({
    type: 'varchar',
    default: null,
    nullable: true
  })
  profile_image: string;


  @ManyToOne(() => Status
   ,(status) => status.id,)
  status: Status;
  

  @ManyToOne(()=>Role ,(role)=>role.id ,{ cascade:true})
  @Index()
  role:Role;

   @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    refresh_token:string;

    @CreateDateColumn({
        type: 'timestamp',
        default: null,
        nullable: true, 
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: null,
        nullable: true, 
    })
    updated_at: Date;

    
}