import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class TodoService {  
  url = 'http://192.168.1.172:8080/api/v1/todo-item';   
  headers =  new HttpHeaders({ 'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getTodoList =() => {
    return this.http.get(this.url);
  }

  addNewTask = (data) => {
    return this.http.post(this.url, data);
  }

  deleteTask = (id) => {
    const options = {
      headers: this.headers,
      body: {
        id: [id]
      }
    }
    return this.http.delete(this.url +"/delete", options)
  }

  deleteMultiple =(id) =>{
  const options = {
    headers: this.headers,
    body: {
      id: id
    }
  }
  return this.http.delete(this.url +"/delete", options)
  }

  updateTask =(id,data) => {
    return this.http.put(this.url +"/" +id, data);
  }
}
