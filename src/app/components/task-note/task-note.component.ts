
import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-task-note',
  templateUrl: './task-note.component.html',
  styleUrls: ['./task-note.component.scss']
})
export class TaskNoteComponent {

  title: string = ''
  description: string = ''

  project: any



  constructor(
    public dialogRef: MatDialogRef<TaskNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: SharedService,
    private route: ActivatedRoute
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }




  updateProject() {

    const projectId = '3';
    console.log(projectId)

    this.service.getProjects().subscribe(res => {


      res.forEach((el, id) => {

        if (el.id == projectId) {
          const projectUpdate = {
            id: id,
            title: el.title,
            date: el.date,
            hour: el.hour,
            task: { 'task-title': this.title, 'description': this.description }
          };


          this.service.updateProject(projectUpdate, projectId).subscribe(
            res => console.log(res)
          );
        }

      })

    })


  }
}
