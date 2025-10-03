import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // GET /todos
  @Get()
  findAll(@Query('search') search?: string): Todo[] {
    return this.todosService.findAll(search);
  }

  // POST /todos
  @Post()
  create(@Body() dto: CreateTodoDto): Todo {
    return this.todosService.create(dto);
  }

  // 🔹 PATCH /todos/:id
  @Patch(':id')
  toggle(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todosService.toggle(id);
  }
}
