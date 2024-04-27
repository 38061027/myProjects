import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  url = 'http://localhost:3000/projetos'

  lastId : number = 0

  constructor(private http: HttpClient) { 
    this.getProjects().subscribe(projects => {
      if (projects.length > 0) {
        const lastProject = projects[projects.length - 1];
        this.lastId = parseInt(lastProject.id); 
      }
    });
  }


  getProjects():Observable<any[]>{
   return this.http.get<any[]>(this.url)
  }

  sendProject(project:any):Observable<any>{
    this.lastId++;
    project.id = this.lastId.toString();

   return this.http.post<any>(this.url, project)
  }

  removeProject(id:string){
    return this.http.delete(`${this.url}/${id}`);
  }

  // notas de dentro do projeto especifico

  updateProject(project: any, id:string): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, project)
  }
  

}
