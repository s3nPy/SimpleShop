import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class PopupService {
  public message$ = new Subject<Popup>()

  private popup(popup: Popup) {
    this.message$.next(popup)
  }

  danger(text: string) {
    this.popup({text, type: 'danger'})
  }

  success(text: string) {
    this.popup({text, type: 'success'})
  }
}

export type PopupType = 'danger' | 'success'

export interface Popup {
  text: string
  type: PopupType
}
