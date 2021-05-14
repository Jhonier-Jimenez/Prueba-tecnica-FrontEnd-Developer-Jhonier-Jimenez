import { Component, OnInit, Input } from '@angular/core';
import { MercadoLibreService } from '../services/mercado-libre.service';

@Component({
  selector: 'app-most-wanted',
  templateUrl: './most-wanted.component.html',
  styleUrls: ['./most-wanted.component.scss']
})
export class MostWantedComponent implements OnInit {
  @Input() amountToShow: number = 4;
  mostWanted: any[] = [];
  visibleItems: any[] = [];
  actualPosition: number = 0;
  totalItems: number = 0;
  loading: boolean = false;

  constructor(private mercadoLibreService: MercadoLibreService) { }

  ngOnInit(): void {
    this.getPage();
  }

  getPage() {
    this.loading = true;
    const randomNumber = Math.floor(Math.random() * 500) // randon number between 0-500
    this.mercadoLibreService.getFashionItems(randomNumber).subscribe((data: any) => {
      this.mostWanted = data.results;
      this.totalItems = this.mostWanted.length;
      this.visibleItems = this.mostWanted.slice(this.actualPosition, this.amountToShow);
      this.loading = false;
    });
  }

  moveRight() {
    const begin = this.actualPosition + 1;
    if (begin + this.amountToShow <= this.totalItems) {
      this.visibleItems = this.mostWanted.slice(begin, begin + this.amountToShow);
      this.actualPosition = begin;
    }
  }

  moveLeft() {
    const begin = this.actualPosition - 1;
    if (begin >= 0) {
      this.visibleItems = this.mostWanted.slice(begin, begin + this.amountToShow);
      this.actualPosition = begin;
    }
  }
}
