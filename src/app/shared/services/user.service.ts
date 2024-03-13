import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iuser } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl:string=`${environment.baseUrl}`;

  constructor(private _http:HttpClient) { }

  getAllUsers():Observable<any>{
    return this._http.get(this.userUrl)
  }

  addNewUser(obj:Iuser){
    return this._http.post<any>(this.userUrl,obj)
  }

  getDeleteUser(id:string){
    return this._http.delete<null>(`${this.userUrl}/${id}`)
  }

  getSingleUser(id:string){
    return this._http.get<Iuser>(`${this.userUrl}/${id}`)
  }

  getUpdateUser(obj:Iuser){
    return this._http.patch<Iuser>(`${this.userUrl}/${obj.id}`,obj)
  }

}
