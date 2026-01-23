import { Component, inject } from '@angular/core';
import { Footer } from '../footer/footer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [Footer, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm: FormGroup
  fb = inject(FormBuilder)
  api = inject(ApiService)
  router = inject(Router)
  toaster = inject(ToastrService)

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }

  register() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      this.api.registerAPI({ username, email, password }).subscribe({
        next: (res: any) => {
          alert("User registeration successfull.......")
          this.registerForm.reset()
          setTimeout(() => {
            this.router.navigateByUrl('/login')

          }, 2000)
        },
        error: (reason: any) => {
          alert(reason.error);
          this.registerForm.reset()
          this.router.navigateByUrl('/login')
        }
      })
    } else {
      alert("Invalid Inputs.....please fill the form with valid input!!!")
    }
  }

}

