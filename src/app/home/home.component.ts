import { Component, OnInit } from '@angular/core';
import { ApiHttpService } from '../api-http-service/api-http-service.module';

declare function abc(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productTitle : any;
  productBy : any;
  addtoBtn : any;
  sampleFirst : any;
  sampleFirstBtn : any;
  sendGift : any;
  sendGiftBtn : any;
  listenText : any;
  WhyText : any;
  YouMayText : any;
  CommunityText : any;
  EventList : any;
  ProductList: any;

  constructor( private dataService: ApiHttpService ) {}

  onClick(evt: any, cityName: any) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLElement>;
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      if(document.getElementById(cityName)){
        let c = window.document.getElementById(cityName);
        if (c !== null) {
        c.style.display = "block";
        evt.currentTarget.className += " active";
        }
      }
  }

  ngOnInit(): void {

    this.dataService.getPagebyId(65332).subscribe(
      (response) => {
        this.productTitle = response;
        if(this.productTitle.success === true){
          this.productTitle = this.productTitle.data;
        }
      },
    (error) => { console.log(error); });
    
    this.dataService.getPagebyId(65333).subscribe(
      (response) => {
        this.productBy = response;
        if(this.productBy.success === true){
          this.productBy = this.productBy.data;
        }
      },
    (error) => { console.log(error); });
    
    this.dataService.getPagebyId(65334).subscribe(
      (response) => {
        this.addtoBtn = response;
        if(this.addtoBtn.success === true){
          this.addtoBtn = this.addtoBtn.data;
        }
      },
    (error) => { console.log(error); });
    
    this.dataService.getPagebyId(65315).subscribe(
      (response) => {
        this.sampleFirst = response;
        if(this.sampleFirst.success === true){
          this.sampleFirst = this.sampleFirst.data;
        }
      },
    (error) => { console.log(error); });
    
    this.dataService.getPagebyId(65316).subscribe(
      (response) => {
        this.sampleFirstBtn = response;
        if(this.sampleFirstBtn.success === true){
          this.sampleFirstBtn = this.sampleFirstBtn.data;
        }
      },
    (error) => { console.log(error); });
    
    this.dataService.getPagebyId(65317).subscribe(
      (response) => {
        this.sendGift = response;
        if(this.sendGift.success === true){
          this.sendGift = this.sendGift.data;
        }
      },
    (error) => { console.log(error); });
    
    this.dataService.getPagebyId(65318).subscribe(
      (response) => {
        this.sendGiftBtn = response;
        if(this.sendGiftBtn.success === true){
          this.sendGiftBtn = this.sendGiftBtn.data;
        }
      },
    (error) => { console.log(error); });
    
    this.dataService.getPagebyId(65335).subscribe(
      (response) => {
        this.listenText = response;
        if(this.listenText.success === true){
          this.listenText = this.listenText.data;
        }
      },
    (error) => { console.log(error); });
    
    this.dataService.getPagebyId(65320).subscribe(
      (response) => {
        this.WhyText = response;
        if(this.WhyText.success === true){
          this.WhyText = this.WhyText.data;
        }
      },
    (error) => { console.log(error); });
    
    this.dataService.getPagebyId(65321).subscribe(
      (response) => {
        this.YouMayText = response;
        if(this.YouMayText.success === true){
          this.YouMayText = this.YouMayText.data;
        }
      },
    (error) => { console.log(error); });
    
    this.dataService.getPagebyId(65327).subscribe(
      (response) => {
        this.CommunityText = response;
        if(this.CommunityText.success === true){
          this.CommunityText = this.CommunityText.data;
        }
      },
    (error) => { console.log(error); });

    this.dataService.getEventList().subscribe(
      (response) => {
        this.EventList = response;
      },
    (error) => { console.log(error); });

    this.dataService.getProductList().subscribe((response) => {
      this.ProductList = response;
    },
    (error) =>{ console.log(error); });

  }

}
