import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private authService: HttpService,private router: Router) { }
  logout(){
    console.log("this logut");
    
    localStorage.removeItem("token");
    this.router.navigate(["auth/login"]);
  }
  toprofile(){
    this.router.navigate(["admin/profile"]);

  }
}
