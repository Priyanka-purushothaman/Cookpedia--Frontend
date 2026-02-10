import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-feedbacklist',
  standalone: false,
  templateUrl: './admin-feedbacklist.html',
  styleUrl: './admin-feedbacklist.css',
})
export class AdminFeedbacklist {

  api = inject(ApiService)
  allFeedbacks: any = signal([])

  ngOnInit() {
    this.getallFeedbacks()
  }

  getallFeedbacks() {
    this.api.getFeedbackListAPI().subscribe((res: any) => {
      this.allFeedbacks.set(res)
      console.log(this.allFeedbacks());

    })
  }
  updateFeedback(id:string,status:string){
    this.api.updateFeedbackStatusAPI(id,{status}).subscribe((res:any)=>{
      this.getallFeedbacks()
    })
  }

}
