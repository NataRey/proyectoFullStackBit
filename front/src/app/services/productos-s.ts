import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos, ApiProductos } from '../interfaces/productos';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosS {

  private API_URL = 'http://localhost:3000/products/';

  constructor(private http: HttpClient) { }

  getAll():Observable<Productos[]>{
    return this.http.get<ApiProductos>(this.API_URL).pipe(
      map(resp => resp.data));
  }
}
