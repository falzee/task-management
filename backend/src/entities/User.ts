import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from "typeorm";
import { Task } from "./Task";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];
}
