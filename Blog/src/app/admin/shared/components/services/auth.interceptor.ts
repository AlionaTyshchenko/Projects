import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Router } from '@angular/router';
import { catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {

      if(this.auth && this.auth.token) {
        req = req.clone( {
          setParams: {
            auth: this.auth.token
          }
        })
      }
    }
    return next.handle(req)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          if(error.status === 401) {
            this.auth.logout()
            this.router.navigate(['/admin', 'login'], {
              queryParams: {
                authFailed: true
              }
            })
          }
          return throwError(error)
        })
      )
  }
}