import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { User } from '../users/user.entity';
import { Operation } from '../operations/operation.entity';

@Entity()
export class Record extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Operation)
  operation: Operation;

  @ManyToOne(() => User)
  user: User;

  @Column()
  amount: number;

  @Column()
  user_balance: number;

  @Column()
  operation_response: string;

  @Column()
  date: Date;

  @Column({ default: false })
  deleted: boolean;
}
