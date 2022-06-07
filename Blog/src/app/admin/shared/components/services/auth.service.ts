import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "src/app/shared/components/main-layout/interfaces";

@Injectable({providedIn: 'root'}) 
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor (private http: HttpClient ) {}
    
    get token() {
      
      const data: string | any= localStorage.getItem('fb-token-exp')
      const expDate = new Date(data)

      if(new Date() > expDate) {
        this.logout()
        return null
      }
      return localStorage.getItem('fb-token')
    }

    login(user:User):Observable<any> {
      user.returnSecureToken = true 
      return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}
      `, user)
        .pipe(
          tap(this.setToken),
          catchError(this.handleError.bind(this))
        )
    }

    logout() {
      this.setToken(null)
    }

    isAuthenticated():boolean {
      return !!this.token
    }

    handleError(error: HttpErrorResponse) {
      const {message} = error.error.error
      
      switch(message) {
        case 'EMAIL_NOT_FOUND':
          this.error$.next('Такой пользователь не зарегестрирован')
          break
        case 'INVALID_PASSWORD':
          this.error$.next('Пароль недействителен')
          break
        case 'USER_DISABLED':
          this.error$.next('Учетная запись пользователя отключена администратором')
          break
    
      }
      return throwError(error)
    }

    private setToken(response:any) {
      if(response) {
        const expDate = new Date(new Date().getTime() + response.expiresIn * 1000)
        localStorage.setItem('fb-token', response.idToken)
        localStorage.setItem('fb-token-exp', expDate.toString())  
      } else {
        localStorage.clear()
      }
    }
  
}