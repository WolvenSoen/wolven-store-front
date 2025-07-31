import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class QuotationService {

  constructor(private http: HttpClient) { }

  startQuotation(body: any){
    const token = 'c2ef38e8a14f67f5e4185db1b9b4c05b61c8b558eea0000bc6b1c8ca233d6fba';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${environment.ENVIA_URL}ship/rate/`, body, { headers });
  }

  generateShipment(body: any) {
    const token = 'c2ef38e8a14f67f5e4185db1b9b4c05b61c8b558eea0000bc6b1c8ca233d6fba';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${environment.ENVIA_URL}ship/generate/`, body, { headers });
  }
}
