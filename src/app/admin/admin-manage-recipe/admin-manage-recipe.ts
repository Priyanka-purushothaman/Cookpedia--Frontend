import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeModel } from '../model/recipeModel';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-manage-recipe',
  standalone: false,
  templateUrl: './admin-manage-recipe.html',
  styleUrl: './admin-manage-recipe.css',
})
export class AdminManageRecipe {
  router = inject(Router)
  api = inject(ApiService)
  route = inject(ActivatedRoute)
  recipeId: string = this.route.snapshot.params['id']
  recipeDetails: any = signal ({})
  // <RecipeModel>
  ingredientArray: any = []
  instructionArray: any = []
  mealTypeArray: any = []

  ngOnInit() {
    if(this.recipeId){
      this.api.getAllRecipesAPI().subscribe((res:any)=>{
        this.recipeDetails.set(res.find((item:any)=>item._id==this.recipeId))
        console.log(this.recipeDetails());
        this.ingredientArray = this.recipeDetails().ingredients
        this.instructionArray = this.recipeDetails().instructions
        this.mealTypeArray = this.recipeDetails().mealType
        
      })
    }
  
  }


  addIngredients(ingredientInput: any) {
    if (ingredientInput.value) {
      this.ingredientArray.push(ingredientInput.value)
      ingredientInput.value = ""
    }
  }
  removeIngredient(value: string) {
    this.ingredientArray = this.ingredientArray.filter((item: string) => item != value)
  }

  addInstuction(instuctionInput: any) {
    if (instuctionInput.value) {
      this.instructionArray.push(instuctionInput.value)
      instuctionInput.value = ""
    }
  }
  removeinstuction(value: string) {
    this.instructionArray = this.instructionArray.filter((item: string) => item != value)
  }
  addmeal(mealInput: any) {
    if (mealInput.value) {
      this.mealTypeArray.push(mealInput.value)
      mealInput.value = ""
    }
  }
  removemeal(value: string) {
    this.mealTypeArray = this.mealTypeArray.filter((item: string) => item != value)
  }

  addRecipe() {
    this.recipeDetails().ingredients = this.ingredientArray
    this.recipeDetails().instructions = this.instructionArray
    this.recipeDetails().mealType = this.mealTypeArray
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty,
      cuisine, caloriesPerServing, image, mealType } = this.recipeDetails()
    if (name && ingredients && instructions && prepTimeMinutes && cookTimeMinutes && servings && difficulty &&
      cuisine && caloriesPerServing && image && mealType) {
      //api call
      console.log(this.recipeDetails());
      this.api.addRecipeAPI(this.recipeDetails()).subscribe({
        next: (res: any) => {
          alert("Recipe added successfully!!!!")
          this.recipeDetails.set = ({})
          this.ingredientArray = []
          this.instructionArray = []
          this.mealTypeArray = []
          this.router.navigateByUrl('/admin/recipes')
        },
        error: (reason: any) => {
          alert(reason.error)
        }
      })

    } else {
      alert("Fill the form completely!!!!")
    }
  }

 editRecipe() {
    this.recipeDetails().ingredients = this.ingredientArray
    this.recipeDetails().instructions = this.instructionArray
    this.recipeDetails().mealType = this.mealTypeArray
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty,
      cuisine, caloriesPerServing, image, mealType } = this.recipeDetails()
    if (name && ingredients && instructions && prepTimeMinutes && cookTimeMinutes && servings && difficulty &&
      cuisine && caloriesPerServing && image && mealType) {
      //api call
      console.log(this.recipeDetails());
      this.api.editRecipeAPI(this.recipeId,this.recipeDetails()).subscribe((res:any)=>{
        alert("Recipe updated successfully!!!!")
        this.router.navigateByUrl('/admin/recipes')
        })
        
      } else {
      alert("Fill the form completely!!!!")
    }
  }

}
