import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';
import {DatePipe} from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls:['../style.css']
})

export class TodoListComponent implements OnInit {
  addTodoForm: FormGroup;
  todos: any;
  selectedIds = []; 
  userMessage :string='';
  taskToUpdateId:string='';

  constructor(private router: Router,private todoService: TodoService,private formBuilder:FormBuilder) { 
    this.getTaskData();
  }

  ngOnInit() { 
    this.addTodoForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time:['',[Validators.required]]
    })
  }

  // get all the todo item
  getTaskData =() =>{
    this.todoService.getTodoList().subscribe(data => {
      this.todos = data; 
    })   
  }
  
  //select todo item for update
  selectedItem = (itemId) => {
    this.todos.forEach(element => {
      if(element.id === itemId){
        this.taskToUpdateId = itemId;
        var d = new Date(element.eventTime);
        let dp = new DatePipe(navigator.language);
        let p = 'HH:mm'; // HH:mm:ss
        let dtr = dp.transform(new Date(element.eventTime), p);

        this.addTodoForm.controls['title'].setValue(element.title);
        this.addTodoForm.controls['description'].setValue(element.description);
        this.addTodoForm.controls['date'].setValue(d.toISOString().substring(0,10));
        this.addTodoForm.controls['time'].setValue(dtr);
      }
    });
  }

  //update changes to database
  updateTask = () => {
    this.userMessage = '';
    if(this.addTodoForm.valid){
      var currnetDate = new Date();
      var currnetTimestamp = currnetDate.getTime();
      let eventTime = new Date(this.addTodoForm.value.date+" "+this.addTodoForm.value.time); // date and time to timestamp
      if(eventTime.getTime() > currnetTimestamp){
        this.addTodoForm.value.eventTime = eventTime.getTime(); 
        this.todoService.updateTask(this.taskToUpdateId,this.addTodoForm.value).subscribe(data => {
          this.getTaskData();
        });
      }else{
        this.userMessage = "Time of the event should always be greater than the current time"
      }
    } else {
        this.userMessage = "All fields are required!"
    }

  }


  addTodo() {
    this.router.navigate(["/add-new"])
  }

  // delete single todo item
  delete = (id) =>{
    console.log(id)
    this.todoService.deleteTask(id).subscribe( data => {
      this.todos = this.todos.filter(todo => todo.id !== id);
    })
  }

   // select multiple todo item for 
  selectedValue =(id,event)=>{
    if(event){
      this.selectedIds.push(id);
      console.log( this.selectedIds);
    }else {
      let index = this.selectedIds.indexOf(id);
      if (index > -1) {
        this.selectedIds.splice(index, 1);
      }
      console.log( this.selectedIds);
    }
  }

  // delete multiple todo item
  deleteSelected =()=>{
    this.todoService.deleteMultiple(this.selectedIds).subscribe( data => {
      this.getTaskData();
    })
  }
}