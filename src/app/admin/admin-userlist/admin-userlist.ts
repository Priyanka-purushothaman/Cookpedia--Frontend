import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-userlist',
  standalone: false,
  templateUrl: './admin-userlist.html',
  styleUrl: './admin-userlist.css',
})
export class AdminUserlist {

  api = inject(ApiService)
  allUsers:any = signal([])

  ngOnInit(){
    this.getAllUsers()
  }

  getAllUsers(){
    this.api.getUserListAPI().subscribe((res:any)=>{
      this.allUsers.set(res)
      console.log(this.allUsers());
      
    })
  }

}
