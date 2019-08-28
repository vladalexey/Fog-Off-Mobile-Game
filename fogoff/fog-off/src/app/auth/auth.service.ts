import { Injectable } from '@angular/core';

//sending POST request to the Express server that handles authentication
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

//performing side effects when subscribing to the observables returned by the HttpClient methods
import { tap, catchError } from 'rxjs/operators';

//APIs for working with asynchronous operations
//BehaviorSubject, stores latest value emitted to its consumers, and whenever a new Observer suscribes, it will immediately receive the "current value" from the BehaviorSubject
import { Observable, BehaviorSubject } from 'rxjs';

//persisting the access token and expiration date in the local storage
import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Holds address of express authentication server
  AUTH_SERVER_ADDRESS: string = 'http://127.0.0.1:3000';
  //Observable, used to suscribe to the authentication state
  authSubject = new BehaviorSubject(false);

  //HttpClient and Storage services
  constructor(private httpClient: HttpClient, private storage: Storage) { }

  //Registering Users
  register(user: User): Observable<AuthResponse> { 
    //Use post to send a POST request to /register
    //Use pipe to chain multiple operators

    console.log("AuthService Regis" + user);

    let httpOptions = { 
      headers: new HttpHeaders({'Content-Type':'application/json'}) 
    };

    // headers.append('Content-Type','application/json');

    return this.httpClient.post<AuthResponse>(this.AUTH_SERVER_ADDRESS + "/register", user).pipe(
      //Check if the response has a user object and set persist the access token and expiration date
      tap(async (res: AuthResponse) => {
        if (res.user) {

          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })
    );
  }

  //Authenticating Users 
  login(user: User): Observable<AuthResponse> {
    
    console.log("Auth Login Func " + user);

    let httpOptions = { 
      headers: new HttpHeaders({'Content-Type':'application/json'}) 
    };
    
    //Send POST request with HttpClient to the /login endpoint
    return this.httpClient.post(this.AUTH_SERVER_ADDRESS + '/login', user)
    .pipe(
      tap( async (res: AuthResponse) => {

        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }

      }), catchError((error) => {
        console.log("HttpError in Login " + error);
        throw new Error(error);
      })
    );
  }

  //Logging out Users
  //Emit a false value in the BehaviorSubject representing authentication state
  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
  }

  //Getting Authentication State
  isLoggedIn() {
    return this.authSubject.asObservable();
  }

  updateUserAva(user: User): Observable<AuthResponse> {

    //Send POST request with HttpClient to the /login endpoint
    return this.httpClient.post(this.AUTH_SERVER_ADDRESS + '/updateAva', user)
    .pipe(
      tap( async (res: AuthResponse) => {
        if (res.user) {

          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }

      }), catchError((error) => {
        console.log("HttpError in Update ava " + error);
        throw new Error(error);
      })
    );

  }

  updateUserUsername(user: User): Observable<AuthResponse> {

    //Send POST request with HttpClient to the /login endpoint
    return this.httpClient.post(this.AUTH_SERVER_ADDRESS + '/updateUsername', user)
    .pipe(
      tap( async (res: AuthResponse) => {
        if (res.user) {

          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }

      }), catchError((error) => {
        console.log("HttpError in Update username " + error);
        throw new Error(error);
      })
    );

  }


}
