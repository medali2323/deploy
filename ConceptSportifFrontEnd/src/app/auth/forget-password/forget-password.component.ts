import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent  implements OnInit{
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  email: string = '';
  password: string = '';
  correctuser:boolean=false
  passwordResetSuccess:boolean=false
  constructor(private authService: HttpService,private router: Router) { }
  ngOnInit(): void {
  
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
    }
    });
    this._erreur.subscribe(message => this.erreurMessage = message);
    this._erreur.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
    }
    });  }
  

  onSubmit(f:NgForm){
    console.log('Username:', f.value.email);
    const loginData = {
      email:f.value.email,
    };
    this.authService.forgotPassword(loginData.email).subscribe(
      (response:any) => {
        console.log('forgotPassword successful:', response);
        this.passwordResetSuccess = true;
        this.router.navigate(["../reset_password"])

      },
      (error:any) => {
        console.error('Login error:', error);
if(error.status==200){
  console.log('forgotPassword successful:', error);
  this.passwordResetSuccess = true;
  this._success.next("Un email de réinitialisation de mot de passe a été envoyé.");
} else{
  this.correctuser=true

}     
      }
    );
  }
}
