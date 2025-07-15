
import { Component, inject } from '@angular/core';
import { Credential } from '../../interfaces/credential';
import { ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginService } from '../../services/login-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  router = inject(Router);
  loginService : LoginService = inject(LoginService);
  credentialForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  handleSubmit(){
    // console.log(this.credentialForm);
    if(this.credentialForm.valid){
      const username = this.credentialForm.value.username;
      const password = this.credentialForm.value.password;

      if(typeof username === 'string' && typeof password === 'string'){
         const credential: Credential ={
          username,
          password,
      };
      this.loginService.login(credential).subscribe((response:any)=>{
        console.log("response: ", response);
        //agregar esto para guardar el token en el local storage
        localStorage.setItem('token',response.data);
        alert("redirigiendo al shop");
        //redirige al shop
        this.router.navigateByUrl('/shop');
      });
      }
    }else{
      console.log("Error invalid form");
    }
  }
}
