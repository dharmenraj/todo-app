import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {  

  constructor() { }
  
  addNewTask =(data) => {
    console.log( data);
  }
}
