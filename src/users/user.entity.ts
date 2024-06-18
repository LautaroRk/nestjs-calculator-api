import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  status: UserStatus;

  @Column({ default: 0 })
  balance: number;
}
