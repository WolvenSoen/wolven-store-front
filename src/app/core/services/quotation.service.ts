import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class QuotationService {

  constructor(private http: HttpClient) { }

  startQuotation(body: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token-envia')}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${environment.ENVIA_URL}ship/rate/`, body, { headers });
  }

  generateShipment(body: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token-envia')}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${environment.ENVIA_URL}ship/generate/`, body, { headers });
  }
}
