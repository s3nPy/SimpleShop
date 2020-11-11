import { HttpClient, HttpEvent } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CartService } from "./cart.service";


@Injectable()
export class OrderService {
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  private toFormData(form): FormData {
    function flat(obj: Object): Object {
      return Object
          .entries(obj)
          .reduce((prev, [key, value]) => {
              const isFlatten = value instanceof File || typeof value !== 'object' || value === null
              const next = isFlatten ? {[key]: value} : flat(value)
              return {...prev, ...next}
      }, {})
    }

    const data = new FormData()
    Object
      .entries(flat(form))
      .forEach(([key, value]) => data.append(key, value))

    // also add ids of items in the cart
    const ids = this.cartService.items.map(item => item.id)
    data.append('cart', JSON.stringify(ids))

    return data
  }

  send(form: Object): Observable<HttpEvent<number>> {
    const data = this.toFormData(form)

    return this.http.post<number>(this.baseUrl + 'shop', data, {
      reportProgress: true,
      observe: 'events'
    })
  }
}
