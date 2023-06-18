import { Component } from '@angular/core';


import { AuthService } from "./services/auth.service"
import { UsersService} from "./services/users.service"

import { FilesService } from "./services/files.service"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  title = 'angular-service';
  imgParent = ""
  showImg = true
  token = ""
  imgRta = ""

  constructor(private authService: AuthService, private usersService: UsersService, private filesService: FilesService) {}

  onLoaded() {
    console.log("loaded p")
  }

  toggleImg() {
    this.showImg = !this.showImg
  }

  createUser() {
    this.usersService.create({
      name: "Sebas",
      email: "sebas@email.com",
      password: "1212"
    })
    .subscribe((rta: any) => {
    console.log(rta)
    })
  }

  login() {
    this.authService.login("sebas@email.com", "1212")
    .subscribe((rta: any) => {
      this.token = rta.access_token
    })
  }

  getProfile() {
    this.authService.getProfile(this.token)
    .subscribe((profile: any) => {
      console.log(profile)
    })
  }

  downloadPdf() {
    this.filesService.getFile("my.pdef", "https://young-sands-07814.herokuapp.com/api/files/dummy.pdf", "application/pdf")
    .subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement
    const file = element.files?.item(0)
    if (file) {
      this.filesService.uploadFile(file)
      .subscribe((rta: any) => {
        this.imgRta = rta.location
      })
    }
  }
}
