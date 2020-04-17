import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  httpHeaders: HttpHeaders;
  constructor(private httpClient: HttpClient) { }

  setHeader() {
    this.httpHeaders = new HttpHeaders().set('Accept', 'application/json');
    this.httpHeaders = this.httpHeaders.append('Content-Type', 'text');
  }

  getRequest(url: string): Observable<any> {
    console.log({ headers: this.httpHeaders });
    console.log(url);
    return this.httpClient.get(url, { headers: this.httpHeaders });
  }

  postRequest(url: string, payload: any): Observable<any> {
    console.log('url', url);
    console.log('payload', payload);
    return this.httpClient.post(url, payload, { headers: this.httpHeaders });
  }

}
