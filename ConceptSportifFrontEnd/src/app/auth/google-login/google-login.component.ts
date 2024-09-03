import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { HttpService } from 'src/app/servises/http.service';

declare var google: any;

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements OnInit {
  user: SocialUser | undefined;

  constructor(private authService: SocialAuthService, private renderer: Renderer2, private el: ElementRef,private http: HttpService) { }

  ngOnInit(): void {
    this.loadGoogleLibrary();
  }

  loadGoogleLibrary(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => {
      this.initGoogleIdentity();
    };
    this.renderer.appendChild(this.el.nativeElement, script);
  }

  initGoogleIdentity(): void {
    google.accounts.id.initialize({
      client_id: '68900402855-o0fil0i4e0260btsrddbsg851srqcqvi.apps.googleusercontent.com',
      callback: (resp: any) => {
        console.log('Google Identity Services initialized:', resp);
        this.http.createtokens(resp).subscribe((ruc: any) => {
          console.log(ruc);
       
      
  
          
        }, (error: any) => {
          alert('Erreur lors de create tiken : ' + error.message);
        });
      }
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350
    });
  }

  signInWithGoogle(): void {
    // Implement Google Sign-In logic using angularx-social-login
  }

  signOut(): void {
    // Implement sign-out logic
  }
}
