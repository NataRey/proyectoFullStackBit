import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudProductos } from './crud-productos/crud-productos';




@Component({
  selector: 'app-admin-panel',
  imports: [CrudProductos],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})
export class AdminPanel {

    constructor(private router: Router){}

  logout(){
    localStorage.removeItem('token'); // eliminar el token de la sesion
    this.router.navigate(['/login']); // redirigirlo al login despues de que se cierre la sesion
  }

}
