import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
  private route:Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Intercepting request:', request);
    
    const token = localStorage.getItem("token");

    if (token) {
      const clone = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      console.log('Request with token:', clone);

      return next.handle(clone).pipe(
        catchError(error => {
          console.error('HTTP Error:', error);

          if (error.status === 401) {
            console.log('expiree');
            
          //  localStorage.clear();
           // this.route.navigate(['auth/login'])
          }

          return throwError(error); // Returning the original error for better context
        })
      );
    }
    
    return next.handle(request);
  }
}


