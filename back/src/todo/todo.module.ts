import { Module } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { ProjectModule } from 'src/project/project.module';
import { TodoRepository } from './todo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService, TodoRepository],
  controllers: [TodoController],
  exports: [TodoService]
})
export class TodoModule {}