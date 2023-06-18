import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

import { User, CreateUserDTO, UpdateUserDTO} from "./../models/user.models"

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = "https://young-sands-07814.herokuapp.com"

  constructor(private http: HttpClient) { }

  create(data: CreateUserDTO) {
    return this.http.post<User>(`${this.apiUrl}/users`, {data})
  }

  getALl() {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
  }

  update(data: UpdateUserDTO) {

  }

}
