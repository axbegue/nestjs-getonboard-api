import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { ManyToOne } from "typeorm/decorator/relations/ManyToOne";
import { User } from "./user.model";

@Entity('job')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.selectedJobs, { nullable: false, orphanedRowAction: 'delete' })
  user: User;

  @Column({ type: 'varchar', length: 255, nullable: false })
  jobId: string;
}
