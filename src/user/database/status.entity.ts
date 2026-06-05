// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   BaseEntity,
//   CreateDateColumn,
//   UpdateDateColumn,
//   DeleteDateColumn,
// } from 'typeorm';

// @Entity()
// export class Status extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({
//     type: 'varchar',
//     length: 100,
//     default: null,
//   })
//   name: string;

//   @CreateDateColumn({
//     type: 'timestamptz'
//   })
//   created_at: Date;

//   @UpdateDateColumn({
//     type: 'timestamptz'
//   })
//   updated_at: Date;

//   @DeleteDateColumn()
//   deleted_at?: Date;

// }
