import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from "@angular/common/http"


import { User } from "./../models/user.models"

import { Auth } from "./../models/auth.models"

import { switchMap, tap } from "rxjs/operators"
import { TokenService } from "./../services/token.service"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "https://young-sands-07814.herokuapp.com"

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/auth/login`, {email, password})
    .pipe(tap((response: any) => {
      this.tokenService.saveToken(response.access_token)
    }))
  }

  getProfile(token: string) {
    // const headers = new HttpHeaders()
    // headers.set("Authorization", `Bearer ${token}`)
    return this.http.get<User>(`${this.apiUrl}/auth/profile`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      //   "Content-type": "application/json"
      // }
    })
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe((switchMap((response: any) => this.getProfile(response.access_token))))
  }

}
