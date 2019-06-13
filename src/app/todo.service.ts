import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {  

  constructor(private http: HttpClient) { }

  getTodoList =() => {
    const url = 'http://192.168.1.172:8080/api/v1/todo-item';    
    return this.http.get(url);
  }

  addNewTask = (data) => {
    return this.http.post("http://192.168.1.172:8080/api/v1/todo-item", data);
  }

  deleteTask = (id) => {
    return this.http.delete("http://192.168.1.172:8080 /api/v1/todo-item/delete?id=6&id=7",id);
  }

  updateUser(data) {
    return this.http.put("http://192.168.1.172:8080/api/v1/todo-item/", +data.id);
  }

  updateTask =(id,data) => {
    console.log(id,data);
  }
}
