import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit{

 project!:any[]

  constructor(private route : ActivatedRoute,
    private service: SharedService
  ){}
ngOnInit(): void {
  this.route.params.subscribe(params => {
    const projectId = params['id']; 
    this.service.getProjects().subscribe(res => {
  
      const project = res.filter(project => project.id == projectId);
      this.project = project; 
      console.log(project)
    });
  });
}

}
  


