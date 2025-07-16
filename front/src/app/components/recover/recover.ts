import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recover',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recover.html',
  styleUrl: './recover.css'
})
export class Recover {
  recoverForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
  });

  mensaje = '';
  constructor(private httpClient: HttpClient){}

  handleRecover(){
    if (this.recoverForm.valid) {
      const email = this.recoverForm.value.email;
      this.httpClient.post<any>('http://localhost:3000/users/forgot-password', { email }).subscribe({
        next: (res) => {
          this.mensaje = res.message;
        },
        error: (err) => {
          this.mensaje = 'Ocurrió un error al enviar el correo.';
          console.error(err);
        }
      });
    }
  }

}
