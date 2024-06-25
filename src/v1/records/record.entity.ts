import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, JoinColumn } from 'typeorm';
import { Operation } from '../operations/operation.entity';
import { User } from '../users/user.entity';

@Entity()
export class Record extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  operation_id: number;

  @ManyToOne(() => Operation)
  @JoinColumn({ name: 'operation_id' })
  operation: Operation;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
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
