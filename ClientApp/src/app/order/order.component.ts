import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../shared/cart.service';
import { OrderService } from '../shared/order.service';
import { PopupService } from '../shared/popup.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  form: FormGroup
  step = 1

  private _titles = [
    'Введите персональные данные',
    'Проверьте корзину',
    'Подтвердите личность',
    'Выберите тип доставки',
    'Проверьте данные',
    'Заказ был успешно оформлен'
  ]


  get title() {
    return `${this.step}. ` + this._titles[this.step-1]
  }

  progress = 0
  submitted = false

  constructor(
    public cartService: CartService,
    private order: OrderService,
    private popupService: PopupService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      step01: new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.maxLength(64)
        ]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern(/(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/)
        ]),
        agree: new FormControl(false, Validators.requiredTrue)
      }),

      step02: new FormGroup({
        check: new FormControl(false, Validators.requiredTrue)
      }),

      step03: new FormGroup({
        snils: new FormControl('', [
          Validators.required,
          Validators.pattern(/[0-9]{3}[\s\-]?[0-9]{3}[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}$/)
        ]),
        photo: new FormControl(null, [Validators.required]),
      }),

      step04: new FormGroup({
        delivery: new FormControl('', [Validators.required]),
        self: new FormGroup({
          city: new FormControl('', [Validators.required]),
        }),
        mail: new FormGroup({
          name2: new FormControl('', [
            Validators.required,
            Validators.maxLength(64)
          ]),
          phone: new FormControl('', [
            Validators.required,
            Validators.pattern(/(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/)
          ]),
          index: new FormControl('', [
            Validators.required,
            Validators.pattern(/[0-9]{6}$/)
          ]),
          address: new FormControl('', [
            Validators.required,
            Validators.maxLength(512)
          ])
        })
      })
    })
  }

  uploadFile(e) {
    const file = (e.target as HTMLInputElement).files[0]
    this.form.patchValue({
      step03: {
        photo: file
      }
    })

    this.form.get('step03.photo').updateValueAndValidity()
  }


  isCurrentStepValid(): boolean {
    const group = this.form.get(`step0${this.step}`)

    if(!group) {
      return false
    }

    return this.step === 4 ?
      group.get('delivery').value === 'self' && group.get('self').valid ||
      group.get('delivery').value === 'mail' && group.get('mail').valid
      :
      group.valid
  }

  next() {
    this.step = this.step % 5 + 1
    if(this.step === 5) {
      this.form.disable()
    }
  }

  submit() {

    this.submitted = true
    this.order.send(this.form.value).subscribe(
      event => {
        if ( event.type === HttpEventType.UploadProgress ) {
          const progress = Math.round((100 * event.loaded) / event.total)
          this.progress = progress
        }

        if ( event.type === HttpEventType.Response ) {
          this.popupService.success(`Успешно! Номер заказа: ${event.body}`)
          this.step += 1
        }
      },
      error => {
        console.log('got an error :c');
        this.popupService.danger('Отправить заказ не удалось. Попробуйте ещё раз.')
      },
      () => {
        this.submitted = false
        this.progress = 0
      }
    )
  }
}
