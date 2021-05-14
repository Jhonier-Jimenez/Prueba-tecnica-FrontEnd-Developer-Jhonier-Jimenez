import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MercadoLibreService } from '../services/mercado-libre.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  items: any[] = [];
  query: string = 'chaqueta';
  loading: boolean = false;
  offset: number = 0;
  currentLoad: number = 0;
  maxLoad: number = 3;

  constructor(
    private mercadoLibreService: MercadoLibreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(filter(params => params.query))
      .subscribe(params => {
        this.query = params.query;
        this.items = [];
        this.currentLoad = 0;
        this.getPage();
      }
    );
  }

  getPage() {
    this.loading = true;
    this.mercadoLibreService.getFashionItems(this.offset, this.query).subscribe((data: any) => {
      this.items = this.items.concat(data.results);
      this.currentLoad++;
      this.loading = false;
    });
  }

  loadMore() {
    this.offset += 10;
    this.getPage();
  }
}
