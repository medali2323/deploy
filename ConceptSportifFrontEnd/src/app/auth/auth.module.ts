import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

const authroutes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'forget_password',
    component:ForgetPasswordComponent
  }, {
    path:'reset_password/:token',
    component:ResetPasswordComponent
  },{
    path:'google',
    component:GoogleLoginComponent
  }
                  
    
    ];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    GoogleLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SocialLoginModule,
    RouterModule.forChild(authroutes),
    NgbAlertModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('68900402855-o0fil0i4e0260btsrddbsg851srqcqvi.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
})
export class AuthModule { }
