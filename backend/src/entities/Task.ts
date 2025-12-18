import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

@Entity("task")
export class Task {
  @PrimaryGeneratedColumn()
  task_id!: number;

  @Column()
  title!: string;

  @Column("text")
  description!: string;

  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status!: TaskStatus;

  @Column({ type: "date" })
  deadline!: Date;

  @Column()
  created_by!: string;

  @ManyToOne(() => User, user => user.tasks)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
