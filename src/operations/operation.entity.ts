import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export enum OperationType {
  ADDITION = 'addition',
  SUBTRACTION = 'subtraction',
  MULTIPLICATION = 'multiplication',
  DIVISION = 'division',
  SQUARE_ROOT = 'square_root',
  RANDOM_STRING = 'random_string',
}

@Entity()
export class Operation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: OperationType;

  @Column()
  cost: number;
}
