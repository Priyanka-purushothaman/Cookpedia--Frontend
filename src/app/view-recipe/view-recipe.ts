import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ApiService } from '../services/api-service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable'



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
  router = inject(Router)

   ngOnInit(){
   this.getRecipe(this.recipeId)
   }


  getRecipe(recipeId:string){
    this.api.viewAPI(recipeId).subscribe((res:any)=>{
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

 viewRelatedrecipes(recipeId:string){
    this.router.navigateByUrl(`/recipes/${recipeId}/view`)
    this.getRecipe(recipeId)
 }

downloadRecipe(){
  this.api.addDowloadAPI(this.recipeId,{name:this.recipe().name,cuisine:this.recipe().cuisine,image:this.recipe().image}).subscribe({
    next:((res:any)=>{
      console.log(res);
      this.pdfRecipe()
    }),
    error:(reason:any)=>{
        console.log(reason);

    }
  })
}


pdfRecipe(){
  let pdf = new jsPDF()
  let titleRow = ['Name','Cusine','Servings','Ingredients','Instrucions']
  let BodyData = [this.recipe().name,this.recipe().cuisine,this.recipe().servings,this.recipe().ingredients,this.recipe().instructions]
autoTable(pdf,{
  head:[titleRow],
  body:[BodyData]
})
pdf.save(`${this.recipe().name}.pdf`)

}

}
