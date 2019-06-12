import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';

@Component({
    selector: 'todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls:['../style.css']
})

export class TodoListComponent implements OnInit {
  todos: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.todos = [
      {
        'id': 1,
        'title': 'trekking',
        'description': 'fdfsdfdssdsg',
        'date':'20/12/2019'
      },
      {
        'id': 2,
        'title': 'riding',
        'description': 'fsdgsdgdfg',
        'date':'20/5/2019'
      },
      {
        'id': 3,
        'title': 'One more thing',
        'description': 'sfsdfgsds',
        'date':'20/6/2019'
      },
    ];
  }

  addTodo() {
    this.router.navigate(["/add-new/new"])
  }

  delete = (id) =>{
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  editData = (id)=>{
    this.router.navigate(["/add-new/"+id]);
  }

}