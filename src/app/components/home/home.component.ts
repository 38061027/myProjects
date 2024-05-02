import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import {
  MatDialog
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { TaskNoteComponent } from '../task-note/task-note.component';
import { ActivatedRoute } from '@angular/router';

export interface DialogData {
  title: string;

}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {

  title!: string;
  date: any = new Date()

  id: any

  project: any[] = []

  projects: any[] = []


  constructor(private service: SharedService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  menuShow() {
    let menu = document.querySelector('.menu-lateral')
    if (menu?.classList.contains('open')) {
      menu.classList.remove('open')
    } else {
      menu?.classList.add('open')
    }
  }


  ngOnInit(): void {
    this.getProjects()
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: this.title },
    });

    let newDate = String(this.date.getDate()).padStart(2, '0') + '/' + String(this.date.getMonth() + 1).padStart(2, '0') + '/' + String(this.date.getFullYear())

    let newHour = String(this.date.getHours()) + ':' + String(this.date.getMinutes())

    dialogRef.afterClosed().subscribe(result => {
      this.title = result;
      if (result) {
        this.service.sendProject({
          title: result, date: newDate, hour: newHour, task: [{
            "task-title": "",
            "description": ""
          }]
        }).subscribe(() => this.getProjects())
      }
    });
  }



  openDialognote(): void {
    const dialogRef = this.dialog.open(TaskNoteComponent, {
      data: { title: this.title },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.title = result;
      if (result) {
        this.service.sendProject({ title: result }).subscribe()
      }
    });
  }



  getProjects() {

    return this.service.getProjects().subscribe(res => this.projects = res)
  }


  removeProject(id: string) {
    this.service.removeProject(id).subscribe(() => this.getProjects())
  }


}
