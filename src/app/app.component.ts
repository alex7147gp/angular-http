import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-service';
  imgParent = ""
  showImg = true

  onLoaded() {
    console.log("loaded p")
  }

  toggleImg() {
    this.showImg = !this.showImg
  }
}
