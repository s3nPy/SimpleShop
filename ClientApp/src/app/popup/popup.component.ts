import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Popup, PopupService } from '../shared/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy {

  popup: Popup = { text: '', type: 'success' }

  sub: Subscription

  constructor(
    private popupService: PopupService
  ) { }

  ngOnInit() {
    this.sub = this.popupService.message$.subscribe( popup => {
      this.popup = popup
    })
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }

  close() {
    this.popup.text = ''
  }

}
