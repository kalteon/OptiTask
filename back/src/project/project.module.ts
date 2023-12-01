import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from 'src/todo/todo.module';

@Module({
    imports: [TypeOrmModule.forFeature([Project]), TodoModule],
    controllers: [ProjectController],
    providers: [ProjectService]
})
export class ProjectModule {}
