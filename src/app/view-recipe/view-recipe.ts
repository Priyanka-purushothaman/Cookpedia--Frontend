import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-view-recipe',
  imports: [Header, Footer, RouterLink],
  templateUrl: './view-recipe.html',
  styleUrl: './view-recipe.css',
})
export class ViewRecipe {
  
  relatedRecipes:any = signal([])
  recipe:any = signal({})
  api = inject(ApiService)
  activateRoute = inject (ActivatedRoute)
   recipeId:string = this.activateRoute.snapshot.params['id']

   ngOnInit(){
   this.getRecipe()
   }


  getRecipe(){
    this.api.viewAPI(this.recipeId).subscribe((res:any)=>{
      this.recipe.set(res)
      // call get related recipe api
      // console.log(this.recipe());
      this.getAllRelatedRecipes(res.cuisine)
      })
  }

 getAllRelatedRecipes(cuisine:string){
  this.api.getRelatedRecipeAPI(cuisine).subscribe((res:any)=>{
    if(res.length>1){
      this.relatedRecipes.set(res.filter((item:any)=>item.name!= this.recipe().name))
    } else{
      this.relatedRecipes.set([])
    }
    console.log(this.relatedRecipes());

  })
 }

}
