import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import {
  MatDialog
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


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


  projects: any[] = []

  constructor(private service: SharedService,
    public dialog: MatDialog) { }

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

    dialogRef.afterClosed().subscribe(result => {
      this.title = result;
      if (result) {
        this.service.sendProject({ title: result }).subscribe(()=>this.getProjects())
      }
    });
  }

  getProjects(){
    return this.service.getProjects().subscribe(res => this.projects = res)
  }


  removeProject(id:number){
    this.service.removeProject(id).subscribe(()=>this.getProjects())
  }


}
