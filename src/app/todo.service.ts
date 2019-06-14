import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {  
   url = 'http://192.168.1.172:8080/api/v1/todo-item';   

  constructor(private http: HttpClient) { }

  getTodoList =() => {
    return this.http.get(this.url);
  }

  addNewTask = (data) => {
    return this.http.post(this.url, data);
  }

  deleteTask = (id) => {
    return this.http.delete(this.url +"/delete?id=" +id);
  }

  deleteMultiple =(id) =>{
    let asdas ='';
    let deleteUrl = "/delete?";
    id.forEach((element, i) => {
      asdas += "id="+element;
      if(id.length !== i+1){
        asdas += "&"; 
      }
    });
    // console.log(this.url +deleteUrl+asdas);
    return this.http.delete(this.url +deleteUrl+asdas);

  }

  updateTask =(id,data) => {
    return this.http.put(this.url +"/" +id, data);
  }
}
