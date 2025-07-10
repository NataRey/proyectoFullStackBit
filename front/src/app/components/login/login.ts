
import { Component } from '@angular/core';
import { Credential } from '../../interfaces/credential';
import { ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
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
      console.log(credential);
      }

    }else{
      console.log("Error invalid form");
    }
  }
}
