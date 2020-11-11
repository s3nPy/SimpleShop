import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { Item } from '../shop/shop.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    public cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  order() {
    if(this.cartService.items.length) {
      this.router.navigate(['/order'])
    }
  }

  remove(item: Item) {
    this.cartService.remove(item).subscribe(success => {
      // something
    })
  }

  clear() {
    this.cartService.clear()
  }

}
