import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-2';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ApiHttpService } from '../api-http-service/api-http-service.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.min.css']
})
export class HeaderComponent implements OnInit {
  public loading: boolean = false;
  home_popup = false
  lost_popup = false
  menus : any;
  login : any;
  wishlist : any;
  home : any;
  lost : any;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  err = false;

  returnUrl: string | undefined;
  error: {} | undefined;
  loginError: string | undefined;


  constructor( private formBuilder: FormBuilder,
    private router: Router, private authService: AuthService, private dataService: ApiHttpService) { }

  isMobile = false;
  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 992;
    if (w > breakpoint) {
      return true;
    } else {
      return false;
    }
  }

  HideHomePopup() {
    this.home_popup = false;
  }
  HideLostPopup() {
    this.lost_popup = false;
  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
      }
    );


    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };

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
isAccount: boolean = false ; // hidden by default
toggleShow() {
  this.isShown = ! this.isShown;
}
toggleShow1() {
  this.isShown = ! this.isShown;
}

get f(): { [key: string]: AbstractControl } {
  return this.loginForm.controls;
}

onReset(): void {
  this.loginForm.reset();
}


onSubmit(): void {
  this.loading = true;
  this.submitted = true;
  this.err = false;
  if (this.loginForm.invalid) {
    this.loading = false;
    this.submitted = false;
    this.err = true;
    return;
  }
  this.authService.login(this.f['email'].value, this.f['password'].value).subscribe((data) => {
    this.loading = false;
    this.submitted = false;
    this.onReset();
    if (this.authService.isLoggedIn()) {
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
        this.router.navigate([redirect]);
      } else {
        this.loginError = 'Email or password is incorrect.';
      }
    },
    error => this.error = error
  );
}

get isLoggedIn() { return this.authService.isLoggedIn(); }
get currentUser() { return this.authService.currentUser(); }
logout() { 
  this.authService.logout();
  const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
  this.router.navigate([redirect]);
}

}