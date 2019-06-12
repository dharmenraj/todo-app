import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['../style.css']
})
export class AddNewComponent implements OnInit {
  addTodoForm: FormGroup;
  userMessage:string = '';

  constructor(private router: Router,private formBuilder:FormBuilder,private todoService: TodoService) {
    console.log(this.router.url.split('/')[2]);
    if(this.router.url.split('/')[2] !== "new"){
      this.getTaskData();
    }
   }

  ngOnInit() {  
    this.addTodoForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
    })
  }

  addNew =() => {
    this.userMessage = '';
    if(this.addTodoForm.valid){
      this.todoService.addNewTask(this.addTodoForm.value);
    }else{
      this.userMessage = "All fields are required!"
    }
  }

  getTaskData =() =>{
    
  }
}
