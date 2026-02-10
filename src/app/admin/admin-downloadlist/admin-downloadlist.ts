import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-downloadlist',
  standalone: false,
  templateUrl: './admin-downloadlist.html',
  styleUrl: './admin-downloadlist.css',
})
export class AdminDownloadlist {

api = inject(ApiService)
downloadList : any = signal([])


  ngOnInit(){
    this.getDownloadList()
  }

  getDownloadList(){
    this.api.getDownloadListAPI().subscribe((res:any)=>{
      this.downloadList.set(res)
      console.log(this.downloadList());
      
    })
  }

}
