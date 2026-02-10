import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-recipelist',
  standalone: false,
  templateUrl: './admin-recipelist.html',
  styleUrl: './admin-recipelist.css',
})
export class AdminRecipelist {

  api = inject(ApiService)
  allRecipies:any = signal([])
  searchKey:string = ""

  ngOnInit(){
    this.getRecipes()
  }

  getRecipes(){
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      this.allRecipies.set(res)
      console.log(this.allRecipies());
      
    })
  }

  deleteRecipe(id:string){
    this.api.removeRecipeAPI(id).subscribe((res:any)=>{
      alert(res)
      this.getRecipes()
    })
  }

}
