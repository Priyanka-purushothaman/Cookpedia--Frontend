import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

selected = new  Date() 
api = inject(ApiService)
isSidebarOpen:boolean = true
router = inject(Router)
userCount = signal <number>(0)
recipeCount = signal <number>(0)
downloadCount = signal <number>(0)
notificationCount = signal <number>(0)
chartOptions: Highcharts.Options = { }; //required

constructor(){
   if(localStorage.getItem("charts")){
     const data = JSON.parse(localStorage.getItem("charts")||"")
      this.chartOptions = {
    chart:{
      type:'bar'
    },
    title:{
      text:'Analysis of Download Recipe Based on Its Cuisine'
    },
    xAxis:{
      type:'category'
    },
    yAxis:{
      title:{
      text:'Total Download Recipe Count'
      }
    },
    legend:{
      enabled:false
    },
    credits:{
      enabled:false
    },
    series:[
      {
    name:'Download Count',
    colorByPoint:true,
    type:'bar',
    data 
      }
    ]
  }
}
  // }

}

ngOnInit(){
  this.getUserCount()
  this.getRecipeCount()
  this.getDownloadCount()
  this.getNotificationCount()
}


getNotificationCount(){
this.api.getFeedbackListAPI().subscribe((res:any)=>{
  this.notificationCount.set(res.filter((item:any)=>item.status=="pending").length)
})
}

getDownloadCount(){
this.api.getDownloadListAPI().subscribe((res:any)=>{
  this.downloadCount.set(res.length)
})
}

getRecipeCount(){
this.api.getAllRecipesAPI().subscribe((res:any)=>{
  this.recipeCount.set(res.length)
})
}

getUserCount(){
this.api.getUserListAPI().subscribe((res:any)=>{
  this.userCount.set(res.length)
})
}


toggleSidebar(){
  this.isSidebarOpen = !this.isSidebarOpen
}

logout(){
sessionStorage.clear()
this.router.navigateByUrl('/login')
}

}
