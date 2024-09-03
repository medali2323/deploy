import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AlertComponent } from './alert/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AlertComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  exports:[
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
