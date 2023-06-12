import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnDestroy, OnChanges {
  
  img = "https://picsum.photos/200"
  @Input("img")
  set changeImg(newImg: string) {
    this.img = newImg
    console.log("change just img => ", this.img)
  }
  @Output() loaded = new EventEmitter<string>()
  counter = 0

  img2 = "https://www.w3schools.com/howto/img_avatar.png"

  imgDefault = "" 
  
  counterFn: number | undefined

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges", "imgValue=>", this.img)
    console.log("changes", changes)
  }

  ngOnInit(): void {
    //console.log("ngOnInit", "imgValue => ", this.img)
    //this.counterFn = window.setInterval(() => {
    //  this.counter += 1
    //  console.log("run counter")
    //}, 1000)
  }

  ngOnDestroy(){
    console.log("ngDestroy")
    window.clearInterval(this.counterFn)
  }

  imgError() {
    this.imgDefault = this.img
  }

  imgLoaded() {
    console.log("loaded")
    this.loaded.emit()
  }

}
