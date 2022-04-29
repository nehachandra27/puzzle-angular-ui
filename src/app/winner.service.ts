import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const baseUrl = 'http://localhost:8090/api/winners';

@Injectable({
  providedIn: 'root'
})
export class WinnerService {

  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(baseUrl);
  }
  create(data) {
    console.log("---------------------------",data);
    return this.http.post(baseUrl, data);
  }

}
