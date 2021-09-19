import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

enum Status {
  Open = 'open',
  Closed = 'closed',
}

@Entity('tickets')
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  priority: Priority;

  @Column()
  status: Status;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
