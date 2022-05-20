import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todo = '';
  todos:Todo[];

  constructor() {
  }

  ngOnInit(): void {
    this.todos = JSON.parse(localStorage.getItem('todos') || '[]');

  }

  toggleDone(id: number){
    this.todos?.map((v,i) =>{
      if(i ==id) v.completed = !v.completed;
      localStorage.setItem('todos', JSON.stringify(this.todos));
      return v;
    })
  }

  removeTodo(id: number){
    this.todos?.splice(id, 1);
    return this.todos;
  }

  addTodo(){
    this.todos?.push({
      text: this.todo,
      completed: false
    })
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.todo = '';
  }
}
