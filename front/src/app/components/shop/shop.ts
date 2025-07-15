import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shop',
  imports: [],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop {
  constructor(private router: Router){}

  logout(){
    localStorage.removeItem('token'); // eliminar el token de la sesion
    this.router.navigate(['/login']); // redirigirlo al login despues de que se cierre la sesion
  }

}
