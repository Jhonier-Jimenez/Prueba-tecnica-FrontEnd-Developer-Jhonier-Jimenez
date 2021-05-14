import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class MercadoLibreService {
    private fashionURL = 'https://api.mercadolibre.com/sites/MCO/search'
    private pageSize = 10;
    private categoryId = 'MCO1430';

    constructor(private http: HttpClient) { }

    getFashionItems(offset: number, query: string = '') {
        let params: any = {
            limit: this.pageSize,
            category: this.categoryId,
            offset,
            q: query
        }
        return this.http.get<any[]>(this.fashionURL, {params})
    }

}

export interface IMercadoLibreProduct {
    title: string;
    price: number;
    original_price: number;
    thumbnail: string;
}
