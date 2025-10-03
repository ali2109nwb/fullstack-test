import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];
  private idCounter = 1;

  findAll(search?: string): Todo[] {
    if (!search) return this.todos;
    const lower = search.toLowerCase();
    return this.todos.filter((t) => t.title.toLowerCase().includes(lower));
  }

  create(dto: CreateTodoDto): Todo {
    const todo: Todo = {
      id: this.idCounter++,
      title: dto.title,
      completed: false,
    };
    this.todos.push(todo);
    return todo;
  }

  toggleCompleted(id: number): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    todo.completed = !todo.completed;
    return todo;
  }

  toggle(id: number): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    todo.completed = !todo.completed;
    return todo;
  }
}
