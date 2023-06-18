import { Component, OnInit } from '@angular/core';
import { Product, CreateProductDTO, UpdateProductDTO } from "../../models/product.models"

import { StoreService } from "../../services/store.service"
import { ProductsService } from "../../services/products.service"

import { switchMap } from "rxjs/operators"

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  total = 0
  
  limit = 10

  offset = 0

  statusDetail: "loading" | "success" | "error" | "init" = "init"

  today: Date = new Date()

  myShoppingCart: Product[] = []

  products: Product[] = []

  productChosen: Product = {
    id: "",
    price: 0,
    images: [],
    title: "",
    description: "",
    category: {
      id: "",
      name: ""
    }
  }

  showProductDetail = false

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService) 
  { 
    this.myShoppingCart = this.storeService.getShoppingCart()
  }

  ngOnInit(): void {
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe((data) => {
      this.products = data
    })
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product)
    this.total = this.storeService.getTotal()
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id: string) {
    this.statusDetail = "loading"
    this.productsService.getProduct(id)
    .subscribe((data: Product) => {
      this.toggleProductDetail()
      this.productChosen = data
      this.statusDetail = "success"
    }), (errorMesa: any) => {
      console.log(errorMesa)
      this.statusDetail = "error"
    }
  }
  
  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product) => this.productsService.update(product.id, { title: "change" })),
    )
    .subscribe((data) => {
      console.log(data)
    })
    this.productsService.fetchReadAndUpdate(id, { title: "change" })
    .subscribe((response: any) => {
      const read = response[0]
      const update = response[1]
    })
  }

  createNewProduct() {

    const product: CreateProductDTO = {
      title: 'Nueo producto',
      description: 'bla bla bla ',
      images: [
        `https://placeimg.com/640/480/any?random=${Math.random()}`,
        `https://placeimg.com/640/480/any?random=${Math.random()}`,
        `https://placeimg.com/640/480/any?random=${Math.random()}`
      ],
      price: 1000,
      categoryId: 1
    }

    this.productsService.create(product)
    .subscribe((data) => {
      this.products.unshift(data)
    })
  
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: "change title",
    }
    const id = this.productChosen.id
    this.productsService.update(id, changes)
    .subscribe((data) => {
      const productIndex = this.products.findIndex((item) => item.id === this.productChosen.id)
      this.products[productIndex] = data
    })
  }

  deleteProduct() {
    const id = this.productChosen.id
    this.productsService.delete(id)
    .subscribe((data) => {
      const productIndex = this.products.findIndex((item) => item.id === this.productChosen.id)
      this.products.splice(productIndex, 1)
      this.showProductDetail = false
    })
  }

  loadMore(page: number) {
    this.offset = 10 * page
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe((data) => {
      this.products = data
    })
  }

}

