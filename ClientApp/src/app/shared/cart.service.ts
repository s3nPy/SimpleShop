import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators"
import { Item } from '../shop/shop.component'


@Injectable()
export class CartService {
  items: CartItem[] = []

  get ready(): boolean {
    return this.items.every(item => item.loaded)
  }

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this.init()
  }

  private save() {
    const cart = JSON.stringify(this.items.map(item => item.id))
    localStorage.setItem('cart', cart)
  }

  private init() {
    // in localStorage only IDs of items
    const ids: number[] = JSON.parse(localStorage.getItem('cart')) || []
    this.items = ids.map( id => ({id}) )

    // load details from server
    this.items.forEach( (item, idx) => {
      this.http.get<Item>(this.baseUrl + `shop/${item.id}`).subscribe(result => {
        this.items[idx] = result
        this.items[idx].loaded = true
      }, error => console.error(error));
    })

  }

  includes(item: Item): boolean {
    return this.items.some(it => it.id === item.id)
  }

  add(item: Item): Observable<boolean> {
    if(this.includes(item)) {
      return of(false)
    }

    this.items.push({...item, loaded: true})
    this.save()
    return of(true)
  }

  remove(item: PartialItem): Observable<boolean> {
    this.items = this.items.filter(it => it.id !== item.id)
    this.save()
    return of(true)
  }

  clear() {
    this.items = []
    this.save()
  }
}

type PartialItem = Partial<Item> & Pick<Item, 'id'>

export interface CartItem extends PartialItem{
  loaded?: boolean
}
