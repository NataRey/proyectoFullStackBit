import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from '../interfaces/credential';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  httpClient = inject(HttpClient);
  login(credential : Credential){
    return this.httpClient.post('http://localhost:3000/inicio-sesion', credential );
  }
}
