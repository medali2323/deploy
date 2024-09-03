import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  correctuser:boolean=false
  m:string=''
  constructor(private authService: HttpService,private router: Router) { }
  ngOnInit(): void {
    let token=localStorage.getItem("token")
    let r=localStorage.getItem("role")
    if(token&&r=="ROLE_ADMIN")
      this.router.navigate(['admin/dashboard'])
    if(token&&r=="ROLE_INSTRUCTOR")
      this.router.navigate(['instructeur/dashboard']);
    if(token&&r=="ROLE_CANDIDAT")
      this.router.navigate(['candidat/dashboard']); 

  }

  onSubmit(f:NgForm){
    console.log('Username:', f.value.email);
    console.log('Password:', f.value.Password);
    const loginData = {
      email:f.value.email,
      password: f.value.password
    };
    this.authService.login(loginData).subscribe(
      (response) => {
        console.log('Login successful:', response);
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("role", response.roles[0]);
        if (response.roles[0] == "ROLE_ADMIN") {
          this.router.navigate(['admin/dashboard']);
        }
        if (response.roles[0] == "ROLE_INSTRUCTOR") {
          this.router.navigate(['instructeur/dashboard']);
        }
        if (response.roles[0] == "ROLE_CANDIDAT") {
          this.router.navigate(['candidat/dashboard']);
        }
        localStorage.setItem("i", response.id);

      },
      (error) => {
        console.error('Login error:', error);
        this.correctuser=true
        this.m='Verifier votre email ou mot de passe'
      }
    );
  }
}
