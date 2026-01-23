import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

 server_url = "http://localhost:3000"
  http = inject(HttpClient)

  //api function - 
  // 1.       get all recipes : called by home & recipes component
  getAllRecipesAPI(){
    return this.http.get(`${this.server_url}/recipes`)
  }


  // register : called by register component
  registerAPI(user:any){
    return this.http.post(`${this.server_url}/register`,user)
  }

  
  // // login : called by login component
  loginAPI(user:any){
    return this.http.post(`${this.server_url}/login`,user)
  }

  // // login : called by login component
  viewAPI(recipeId:string){
    return this.http.get(`${this.server_url}/view/${recipeId}`)
  }

  // related-view?cuisine=Italian
  getRelatedRecipeAPI(cuisine:string){
    return this.http.get(`${this.server_url}/related-view?cuisine=${cuisine}`)
  }
  
}
