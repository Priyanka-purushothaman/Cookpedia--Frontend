import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
isLoggedin:boolean = false
logginUsername:string = ""
router = inject(Router)


ngOnInit(){
  if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
 this.isLoggedin = true
 const user = JSON.parse(sessionStorage.getItem("user")||"")
 this.logginUsername = user.username
     } 
   }

   logout(){
    sessionStorage.clear()
    this.isLoggedin = false
    this.logginUsername = ""
    this.router.navigateByUrl('/')
   }
}



