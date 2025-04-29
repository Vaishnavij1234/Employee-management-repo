import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  // Post
  postemployee(data: any) {
    return this._http.post<any>("https://employeesys-backend.onrender.com/employee", data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  // Get
  getemployee() {
    return this._http.get<any>("https://employeesys-backend.onrender.com/employee")
      .pipe(map((res: any) => {
        return res;
      }));
  }

  // Update
  updateemployee(data: any, id: number) {
    return this._http.put("https://employeesys-backend.onrender.com/employee" + id, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  // Delete
  deleteemployee(id: number) {
    return this._http.delete<any>(`https://employeesys-backend.onrender.com/employee/${id}`)
      .pipe(map(res => res));
  }
  
}
