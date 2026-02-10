import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ApiService } from '../services/api-service';
import { Router } from '@angular/router';
import { SearchPipe } from '../pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-recipes',
  imports: [Header, Footer,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {
  p: number = 1;
  searchKey:string =""
  allRecipes: any = signal([])
  dummyAllRecipes:any = []
  cusineArray: any = signal([])
  mealtypeArray:any = signal([])
  api = inject(ApiService)
  router = inject(Router)

  ngOnInit() {
    this.getAllRecipes()
  }

  getAllRecipes() {
    this.api.getAllRecipesAPI().subscribe((res: any) => {
      // console.log(res);
      this.allRecipes.set(res)
      this.dummyAllRecipes = this.allRecipes()
      // console.log(this.allRecipes());
      this.allRecipes().forEach((item: any) => {
        !this.cusineArray().includes(item.cuisine) && this.cusineArray().push(item.cuisine)
      });
      // console.log(this.cusineArray());
    let dummyMealTypeArray = this.allRecipes().map((item:any)=>item.mealType).flat(Infinity)
      dummyMealTypeArray.forEach((item:any)=>{
        !this.mealtypeArray().includes(item) && this.mealtypeArray().push(item)
      })
      // console.log(this.mealtypeArray());
      })
  }

  filterRecipe(key:string,value:string){
    this.allRecipes.set(this.dummyAllRecipes.filter((item:any)=>item[key]==value))

  }



  viewRecipe(recipeId: string) {
    if (sessionStorage.getItem("token")) {
      this.router.navigateByUrl(`recipes/${recipeId}/view`)
    } else {
      alert("Please login")
    }

  }

}






