import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  projects:any[] = []

  constructor(private service: SharedService){}

  menuShow(){
    let menu = document.querySelector('.menu-lateral')
    if(menu?.classList.contains('open')){
      menu.classList.remove('open')
    }else{
      menu?.classList.add('open')
    }
  }


  ngOnInit(): void {
   this.service.getProjects().subscribe(res => this.projects = res)
  }

}
