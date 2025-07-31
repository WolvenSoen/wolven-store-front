import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  getProducts() {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.get(`${environment.BASE_URL}products`, { headers });
  }
}
