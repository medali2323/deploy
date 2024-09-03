import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{
  user:any={}
  id:any
  constructor(private authService: HttpService,private router: Router) { }
  ngOnInit(): void {

    this.id = localStorage.getItem("i")
    this.getuser(this.id);
  }
  logout(){
    console.log("this logut");
    
    localStorage.clear()
    this.router.navigate(["auth/login"]);
  }
  toprofile(){
    let roles=localStorage.getItem("role")
    if (roles==="ROLE_ADMIN") {
          this.router.navigate(["admin/profile"]);

    }
    if (roles==="ROLE_INSTRUCTOR") {
      this.router.navigate(["instructeur/profile"]);

}
  }
  getuser(id: number): void {
    this.authService.getById("admins",id)
      .subscribe((data) => {
        console.log(data);
        
        this.user = data;
 
      });
  }
}