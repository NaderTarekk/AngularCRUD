import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postProducts(data: any) {
    return this.http.post<any>("http://localhost:3000/productList", data)
  }
  getProducts() {
    return this.http.get<any>("http://localhost:3000/productList/")
  }
  putProducts(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/productList/" + id, data)
  }
  deleteProducts(id: any) {
    return this.http.delete<any>("http://localhost:3000/productList/" + id)
  }
}
