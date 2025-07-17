import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from '../interfaces/credential';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  httpClient = inject(HttpClient);
  login(credential : Credential){
    return this.httpClient.post('http://localhost:3000/inicio-sesion', credential );
  }

  decodeToken(token: string):any{
    return jwt_decode(token);
  }
}
