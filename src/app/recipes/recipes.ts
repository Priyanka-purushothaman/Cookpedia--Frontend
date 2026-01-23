import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ApiService } from '../services/api-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  imports: [Header, Footer],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {

  allRecipes: any = signal([])
  cusineArray: any = signal([])
  api = inject(ApiService)
  router = inject(Router)

  ngOnInit() {
    this.getAllRecipes()
  }

  getAllRecipes() {
    this.api.getAllRecipesAPI().subscribe((res: any) => {
      // console.log(res);
      this.allRecipes.set(res)
      // console.log(this.allRecipes());
      this.allRecipes().forEach((item: any) => {
        !this.cusineArray().includes(item.cuisine) && this.cusineArray().push(item.cuisine)
      });
      console.log(this.cusineArray());

    })
  }

  viewRecipe(recipeId: string) {
    if (sessionStorage.getItem("token")) {
      this.router.navigateByUrl(`recipes/${recipeId}/view`)
    } else {
      alert("Please login")
    }

  }

}






