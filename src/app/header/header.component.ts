import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-2';
import { ApiHttpService } from '../api-http-service/api-http-service.module';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menus : any;
  home : any;
  constructor( private dataService: ApiHttpService) { }

  ngOnInit(): void {

    this.dataService.getMenuList().subscribe(
      (response) => {
        this.menus = response;
        if(this.menus.success === true){
          this.menus = this.menus.data;
        }
      },
      (error) => { console.log(error); });

    this.dataService.getPagebyId(65308).subscribe(
      (response) => {
        this.home = response;
        if(this.home.success === true){
          this.home = this.home.data;
        }
      },
      (error) => { console.log(error); });
      
    }

  customOptions: OwlOptions = {
    loop:true,
    margin:20,
    nav:true,
    dots:false,
	  autoplay:true,
    navSpeed: 4000,
    autoplaySpeed:4000,
    navText: ['', ''],
    responsive: {
      0:{
        items:1,
    },
    600:{
        items:1,
    },
    992:{
        items:1,
      },
    },
};

isShown: boolean = false ; // hidden by default
isShown1: boolean = false ; // hidden by default
toggleShow() {
  this.isShown = ! this.isShown;
}
toggleShow1() {
  this.isShown = ! this.isShown;
}

}
