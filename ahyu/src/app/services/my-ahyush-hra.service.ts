import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyAhyushHraService {

  constructor(private http:HttpClient) { }
  getAhyushJson(){
let apiUrl='./assets/forAhyushIndia.json'
return this.http.get(apiUrl);

  }
}
