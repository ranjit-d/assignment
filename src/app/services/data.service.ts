import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseurl='http://localhost:3000/posts';

  constructor(private http:HttpClient) { }

  getcall(){
    return this.http.get(this.baseurl);
  }

  postcall(body:any){
    return this.http.post<any>(this.baseurl,body);
  }

  deletecall(id:any){
    return this.http.delete(this.baseurl+'/'+id)
  }

  updatecall(data:any,id:any){
    // return this.http.put(this.baseurl+'/'+post.id,JSON.stringify({isRead:true}))
   return this.http.put (this.baseurl+'/'+id,data)
  }

  }


