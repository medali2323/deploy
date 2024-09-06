import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-ca',
  templateUrl: './ca.component.html',
  styleUrls: ['./ca.component.css']
})
export class CaComponent {

  email: string = '';
  password: string = '';
  username:string='';
  correctuser:boolean=false
  constructor(private authService: HttpService,private router: Router) { }
  ngOnInit(): void {
  
    throw new Error('Method not implemented.');
  }

  onSubmit(f:NgForm){
    console.log('Username:', f.value.email);
    console.log('Password:', f.value.Password);
    const loginData = {
      email:f.value.email,
      password: f.value.password,
      username:f.value.username
    };
    f.value.username=f.value.nom+"_"+f.value.PREnom
    f.value.username=f.value.nom+"_"+f.value.PREnom
   
    console.log(f.value);

    this.authService.registeradmin(f.value).subscribe(
      (response) => {
        console.log('Login successful:', response);
       

        this.router.navigate(['auth/login']);

      },
      (error) => {
        console.error('Login error:', error);
        this.correctuser=true
      }
    );
  }
}
