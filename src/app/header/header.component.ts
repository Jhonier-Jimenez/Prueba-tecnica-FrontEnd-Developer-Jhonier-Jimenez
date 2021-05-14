import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  query: string = '';
  isMenuOpened: boolean = false;
  isSearchVisible: boolean = false;
  tabs: string[] = [
    'Hombre',
    'Mujer',
    'Junior',
    'Niños',
    'Accesorios',
    'Ofertas'
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(filter(params => params.query))
      .subscribe(params => {
        this.query = params.query;
      }
    );
  }

  onEnter(query: string) {
    this.router.navigate(['/search'], { queryParams: { query } });
  }

  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  openSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

}
