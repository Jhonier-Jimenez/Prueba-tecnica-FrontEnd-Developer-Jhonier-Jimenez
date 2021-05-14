import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() product: any;
  discount: number = 0;

  constructor() { }

  ngOnInit() {
    if (this.product.original_price) {
      this.discount = 100 - Math.floor((this.product.price * 100) / this.product.original_price);
    }
  }

}
