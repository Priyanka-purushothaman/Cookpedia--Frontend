import { Component, inject } from '@angular/core';
import { ApiService } from '../services/api-service';
import { FormsModule } from '@angular/forms';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';



@Component({
  selector: 'app-contact',
  imports: [Header, Footer, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  name: string = ""
  email: string = ""
  message: string = ""
  api = inject(ApiService)

  addFeedback() {
    if (this.name && this.email && this.message) {
      this.api.addFeedbackAPI({ name: this.name, email: this.email, message: this.message }).subscribe((res: any) => {
        alert("Thank you for your feedback......We appreciate your effort to improve!!!!")
        this.name = ""
        this.email = ""
        this.message = ""
      })
    } else{
      alert("Fill the form completely!!!!!")
    }
  }

}
