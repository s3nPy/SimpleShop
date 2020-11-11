import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  items: Item[] = []

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }

  ngOnInit() {
    this.http.get<Item[]>(this.baseUrl + 'shop').subscribe(result => {
      result.forEach(item => {
        item.inCart = this.cartService.includes(item)
      })
      this.items = result
    }, error => console.error(error));

  }

  addInCart(id: number) {
    const item = this.items.find(item => item.id === id)

    this.cartService.add(item).subscribe(success => {
      if(success) {
        item.inCart = true
      }
    })
  }

}

export interface Item {
  id: number
  name: string
  price: number
  attr: ItemAttr

  inCart?: boolean
}

export interface ItemAttr {
  color: string
  format: 'A3' | 'A4'
}
