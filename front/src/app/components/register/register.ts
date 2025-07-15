import { RegisterS } from './../../services/register-s';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../interfaces/api-response';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  name = "";
  email = "";
  password = "";

  constructor(private registerS: RegisterS, private router: Router){}

  handleSubmit(): void{
    if(!this.name || !this.email || !this.password){
      alert("Completa todos los campos");
      return;
    }

    this.registerS.createUser(this.name, this.email, this.password).subscribe({
      next:(res: ApiResponse)=>{
        if(res.result === 'fine'){
          alert("Usuario registrado correctamente");
          this.router.navigate(['/login']);
        }else{
          alert(res.message || "No se pudo registrar el usuario");
        }
      },
      
      error: (err)=>{
        console.log("Error en el servidor", err);
        alert("Error inesperado");
      }
    });
  }
 }
