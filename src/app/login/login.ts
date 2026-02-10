import { Component, Inject, inject } from '@angular/core';
import { Footer } from '../footer/footer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [Footer, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm: FormGroup
  fb = inject(FormBuilder)
  api = inject(ApiService)
 router = inject(Router)
  toaster = Inject(ToastrService)

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }

  //login
     login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      this.api.loginAPI({email,password}).subscribe({
        next:(res:any)=>{
          sessionStorage.setItem("token",res.token)
          sessionStorage.setItem("user",JSON.stringify(res.user))
           alert("User login successfull.......")
           this.api.getChartData()
          this.loginForm.reset()

          if(res.user.role=="user"){
            this.router.navigateByUrl('/')
          }else{
            this.router.navigateByUrl('admin')
          }
       },
       
        error:(reason:any)=>{
          alert(reason.error);
        }
      })
       } else {
      alert("Invalid Inputs.....please fill the form with valid input!!!")
    }
  }

}
