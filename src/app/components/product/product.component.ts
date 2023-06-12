import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from "../../models/product.models"

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: Product = {
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

  @Output() addedProduct = new EventEmitter<Product>()

  onAddToCart() {
    this.addedProduct.emit(this.product)
  }

}
