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
  todos: any;
  selectedTdo;
  selectedItem: any;

  constructor(private router: Router,private formBuilder:FormBuilder,private todoService: TodoService) {
  }

  ngOnInit() {  

    this.addTodoForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time:['',[Validators.required]]
    })
  }

  // add new todo item
  addNew =() => {
    this.userMessage = '';
    if(this.addTodoForm.valid){
      var currnetDate = new Date();
      var currnetTimestamp = currnetDate.getTime();
      let eventTime = new Date(this.addTodoForm.value.date+" "+this.addTodoForm.value.time); // date and time to timestamp
      if(eventTime.getTime() > currnetTimestamp){
        this.addTodoForm.value.eventTime = eventTime.getTime(); 
        this.todoService.addNewTask(this.addTodoForm.value).subscribe(data => {
          console.log(data);
          this.router.navigate(["/"]);
        });
      }else{
        this.userMessage = "Time of the event should always be greater than the current time"
      }
    } else {
        this.userMessage = "All fields are required!"
    }
  }
}