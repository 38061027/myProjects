
import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-task-note',
  templateUrl: './task-note.component.html',
  styleUrls: ['./task-note.component.scss']
})
export class TaskNoteComponent implements OnInit{

  title: string = ''
  description: string = ''

  project: any

id!:string

  constructor(
    public dialogRef: MatDialogRef<TaskNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    
    const routerState = this.router.routerState;
    const url = routerState.snapshot.url;
    this.id =  String(url.match(/[0-9]/g))

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }


  updateProject() {
    this.service.getProjects().subscribe(res => {


      res.forEach((el, id) => {

        if (el.id == this.id) {
          const projectUpdate = {
            id: id,
            title: el.title,
            date: el.date,
            hour: el.hour,
            task: { 'task-title': this.title, 'description': this.description }
          };
          this.service.updateProject(projectUpdate, this.id).subscribe(
            res => console.log(res)
          );
        }

      })

    })


  }
}
