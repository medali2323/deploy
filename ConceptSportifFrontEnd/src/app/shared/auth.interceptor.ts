import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    console.log('Interceptor is called');    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error in Interceptor:', error);
        if (error.status === 401) {
          console.log('Redirecting to login page');
          localStorage.clear()
          this.router.navigate(['auth/login']);
        }
        return throwError(error);
      })
    );
  }
  
}
