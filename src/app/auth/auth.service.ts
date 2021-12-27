import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private actionUrl: string;
  errorData?: {};
  data1?: string | undefined;

  constructor(private http: HttpClient) { 
    this.actionUrl = `${environment.API_URL}`;
  }
  redirectUrl?: string;

  login(email: string, password: string) {
    let data = {
      email: email,
      password: password,
      unique_code: 'jKGXPaXlEPkqzVIQmjy3',
      type: 'customer'
    }

    return this.http.post<any>(this.actionUrl+`/api/v2/staffLogin`, data)
    .pipe(map(user => {
        if (user && user.success) {
          localStorage.setItem('currentUser', JSON.stringify(user.data));
        }
      }),
      catchError(this.handleError)
    );
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  currentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.token;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  register(firstname: string, lastname: string, email: string, password: string, cellphone: string) {
    let data = {
      firstname: firstname,
      lastname: lastname,
      company_name: 'Mediocrates',
      cellphone: cellphone,
      email: email,
      password: password,
      unique_code: 'jKGXPaXlEPkqzVIQmjy3',
      type: 'manual'
    }

    return this.http.post<any>(this.actionUrl+`/api/v2/customer/signup`, data)
    .pipe(map(user => {
        if (user && user.success) {
          localStorage.setItem('currentUser', JSON.stringify(user.data));
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }

}
