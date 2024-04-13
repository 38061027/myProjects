import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  url = 'http://localhost:3000/projetos'

  constructor(private http: HttpClient) { }


  getProjects():Observable<any[]>{
   return this.http.get<any[]>(this.url)
  }


}
