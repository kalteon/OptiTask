import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../project/project.entity';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    todoId: number;

    @Column({ length: 255 })
    todoName: string;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @Column()
    success: boolean;

    @ManyToOne(() => Project, project => project.projectId)
    project: Project;
}