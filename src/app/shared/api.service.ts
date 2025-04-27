import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }


// post
postemployee(data:any){
  return this._http.post<any>("http://localhost:3000/employee",data)
  .pipe(map((res:any)=>{
    return res;
  }))
}

//To get the data
getemployee(){
  return this._http.get<any>("http://localhost:3000/employee")
  .pipe(map((res:any)=>{
    return res;
  }))
}

//update
updateemployee(data:any,id:number){
  return this._http.put("http://localhost:3000/employee/"+id,data)
  .pipe(map((res:any)=>{
    return res;
  }))
}

// delete
deleteemployee(id:number){
  return this._http.delete<any>("http://localhost:3000/employee/"+id)
  .pipe(map((res:any)=>{
    return res;
  }))
}


}

 

