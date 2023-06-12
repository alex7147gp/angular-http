import { Component, OnInit } from '@angular/core';
import { Product } from "../../models/product.models"

import { StoreService } from "../../services/store.service"
import { ProductsService } from "../../services/products.service"

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  total = 0
  
  today: Date = new Date()

  myShoppingCart: Product[] = []

  products: Product[] = []

  constructor( private storeService: StoreService, private productsService: ProductsService) { 
    this.myShoppingCart = this.storeService.getShoppingCart()
  }

  ngOnInit(): void {
    this.productsService.getAllProduct()
    .subscribe((data) => {
      this.products = data
    })
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product)
    this.total = this.storeService.getTotal()
  }


}
