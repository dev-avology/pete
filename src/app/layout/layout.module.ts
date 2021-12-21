import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CarouselModule } from 'ngx-owl-carousel-2';
@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule.forChild([])
  ],
  exports: [
    MainLayoutComponent,
  ],
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class LayoutModule { }
