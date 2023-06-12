import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

import { Product } from "./../models/product.models"


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProduct() {
    return this.http.get<Product[]>("https://young-sands-07814.herokuapp.com/api/products")
  }
}
