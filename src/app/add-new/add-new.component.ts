import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['../style.css']
})
export class AddNewComponent implements OnInit {
  addTodoForm: FormGroup;
  userMessage:string = '';
  todo: Todo = new Todo();
  constructor(private router: Router,private formBuilder:FormBuilder,private todoService: TodoService) {
    if(this.router.url.split('/')[2] !== "new"){ 
       
    }
  }

  ngOnInit() {  
  
    // to set the formdata
    this.addTodoForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
    })
  }

  // add new todo task
  addNew =() => {
    this.userMessage = '';
    if(this.addTodoForm.valid){
      if (this.router.url.split("/")[2] !== "new") {
        this.todoService.updateTask(this.router.url.split("/")[2], this.addTodoForm.value);
      } else {
        this.todoService.addNewTask(this.addTodoForm.value).subscribe(data => {
          console.log(data);
        });
          this.todo = new Todo();
          this.router.navigate(["/"]);
      }
    } else {
        this.userMessage = "All fields are required!"
    }
  }

}
