import { Pipe, PipeTransform } from "@angular/core";
import { Item } from "../shop/shop.component";


@Pipe({
  name: 'sumitems',
  pure: false
})
export class SumItemsPipe implements PipeTransform {
  transform(items: Item[]): number {
    return items.reduce((sum, item) => item.price ? sum + item.price : sum, 0)
  }
}
