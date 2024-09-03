import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpService } from './servises/http.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private auth: HttpService, private router: Router) {}

  canActivate(): boolean {
  //  let role=this.auth.getRole();
  let role=localStorage.getItem("role");
    console.log(role);
    
    if (this.auth.logedin()&&role==='ROLE_ADMIN') {
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
