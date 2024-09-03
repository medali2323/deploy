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
import { HttpService } from '../servises/http.service';
import { jwtDecode } from "jwt-decode";
import { DatePipe } from '@angular/common';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
  private route:Router,private http:HttpService,private datePipe: DatePipe
  ) {}
  convertTimestampToDate(timestamp: number): string |null{
    const date = new Date(timestamp * 1000); // Convertir le timestamp en millisecondes
    return this.datePipe.transform(date, 'dd/MM/yyyy h:mm:ss a'); // Formater la date
  }
  convertDateToTimestamp(date: Date): number {
    return Math.floor(date.getTime() / 1000); // Convertir les millisecondes en secondes
  }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Intercepting request:', request);
    
    const token = localStorage.getItem("token");
    
    if (token) {
      const decoded = jwtDecode(token);

      let dd=this.convertDateToTimestamp(new Date())
      
      const clone = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      console.log('Request with token:', clone);
      
      if ((Number(decoded.exp)-dd)<=0) {
          localStorage.clear();
            this.route.navigate(['auth/login'])
      }
      
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


