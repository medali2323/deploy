import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetToken: string;

  constructor(private router:Router,private route: ActivatedRoute,private authService:HttpService) {
    const tokenFromRoute = this.route.snapshot.paramMap.get('token');
    this.resetToken = tokenFromRoute !== null ? tokenFromRoute : '';
  }

  passwordResetSuccess: boolean = false;

  onResetSubmit(form: NgForm): void {
    if (form.valid) {
      const loginData = {
        Password: form.value.newPassword,
        repeatPassword:form.value.newPassword,
        otp:this.resetToken,
      };
      
      this.authService.resetPassword(loginData).subscribe(
        (response) => {
          console.log('reset password  successful:', response);
          this.passwordResetSuccess = true;
          localStorage.clear();
          this.router.navigate(['auth/login']);
          

  
        },
        (error) => {
          console.error('Login error:', error);
        }
      ); 
      // Logique pour réinitialiser le mot de passe ici
    }
  }
}
