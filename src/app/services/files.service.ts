import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

import { saveAs } from "file-saver"
import { tap, map } from "rxjs/operators"


interface File {
  originalname: string;
  filename: string;
  location: string
}

@Injectable({
  providedIn: 'root'
})


export class FilesService {

  private apiUrl = "https://young-sands-07814.herokuapp.com"


  constructor(private http: HttpClient) { }

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, {responseType: "blob"})
    .pipe(tap((content: any) => {
      const blob = new Blob([content], {type})
      saveAs(blob, name)
    }),
    map(() => true)
    )
  }

  uploadFile(file: Blob) {
    const dto = new FormData()
    dto.append("file", file)
    return this.http.post<File>(`${this.apiUrl}/file/upload`, dto, {
      // headers: {
      //   "Content-type": "multipart/form-data"
      // }
    })
  }
}
