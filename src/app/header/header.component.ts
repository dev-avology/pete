import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-2';
import { ApiHttpService } from '../api-http-service/api-http-service.module';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.min.css']
})
export class HeaderComponent implements OnInit {
  home_popup = false
  lost_popup = false
  menus : any;
  login : any;
  wishlist : any;
  home : any;
  lost : any;

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

    this.dataService.getPagebyId(65330).subscribe(
      (response) => {
        this.login = response;
        if(this.login.success === true){
          this.login = this.login.data;
        }
      },
    (error) => { console.log(error); });
      
    this.dataService.getPagebyId(65331).subscribe(
      (response) => {
        this.wishlist = response;
        if(this.wishlist.success === true){
          this.wishlist = this.wishlist.data;
        }
      },
    (error) => { console.log(error); });

    this.dataService.getPagebyId(65309).subscribe(
      (response) => {
        this.lost = response;
        if(this.lost.success === true){
          this.lost = this.lost.data;
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
