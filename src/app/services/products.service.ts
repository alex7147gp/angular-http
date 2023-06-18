import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from "@angular/common/http"

import { retry, catchError, map } from "rxjs/operators"
import { throwError, zip } from "rxjs"

import { Product, CreateProductDTO, UpdateProductDTO } from "./../models/product.models"

import { environment } from "./../../environments/environment"

import { checkTime } from "./../interceptors/time.interceptor"



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //mod proxy private apiUrl = `${environment.API_URL}api/products`

  private apiUrl = "https://young-sands-07814.herokuapp.com"

  constructor(private http: HttpClient) { }

  getAllProduct(limit?: number, offset?: number) {
    let params = new HttpParams()
    if (limit && offset) {
      params = params.set("limit", limit)
      params = params.set("offset", offset)
    }
    return this.http.get<Product[]>(this.apiUrl, { params, context: checkTime() })
    .pipe(
      retry(3),
      map((products) => products.map((item) => {
        return {
          ...item,
          texas: 12 * item.price
        }
      }))
    )
  }

 fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
  return zip(
    this.getProduct(id),
    this.update(id, dto)
  )
 }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError("algo esta fallando en el servidor")
        } 
        if (error.status === HttpStatusCode.NotFound) {
          return throwError("el producto no existe")
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError("no estas permitido")
        }

        return throwError("ups algo salio mal")
      })
    )
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset }
    })
  }

  create(data: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, data)
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto)
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
  }

}
