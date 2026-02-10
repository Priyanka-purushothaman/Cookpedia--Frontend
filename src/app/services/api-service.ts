import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  server_url = "https://cookpedia-server-5e9c.onrender.com"
  http = inject(HttpClient)

  //api function - 
  // 1.       get all recipes : called by home & recipes component
  getAllRecipesAPI() {
    return this.http.get(`${this.server_url}/recipes`)
  }


  // register : called by register component
  registerAPI(user: any) {
    return this.http.post(`${this.server_url}/register`, user)
  }


  // // login : called by login component
  loginAPI(user: any) {
    return this.http.post(`${this.server_url}/login`, user)
  }

  appendToken() {
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append("Authorization", `Bearer ${token}`)
    }
    return { headers }
  }

  // // login : called by login component
  viewAPI(recipeId: string) {
    return this.http.get(`${this.server_url}/view/${recipeId}`, this.appendToken())
  }

  // related-view?cuisine=Italian
  getRelatedRecipeAPI(cuisine: string) {
    return this.http.get(`${this.server_url}/related-view?cuisine=${cuisine}`, this.appendToken())
  }

  // download/:id api
  addDowloadAPI(recipeId: string, reqBody: any) {
    return this.http.post(`${this.server_url}/download/${recipeId}`, reqBody, this.appendToken())
  }

  //localhost:3000/recipes/696fccaa319fc57e4395e679/save : post - aclled view recipe component when save recipe btn clicked
  addToSaveRecipesAPI(recipeId: string, reqBody: any) {
    return this.http.post(`${this.server_url}/recipes/${recipeId}/save`, reqBody, this.appendToken())
  }

  //http://localhost:3000/recipes-collection :get request from save recipe component when page load
  getUserSaveRecipesAPI() {
    return this.http.get(`${this.server_url}/recipe-collection`, this.appendToken())
  }

  //http://localhost:3000/recipe-collection/697858d8db110e851f3cc53d - delete from save recipe component when delete btn clicked
  removeUserSaveRecipeItemAPI(recipeId: string) {
    return this.http.delete(`${this.server_url}/recipe-collection/${recipeId}`, this.appendToken())
  }

  // http://localhost:3000/feedback :post by contact component when submit btn clicked
  addFeedbackAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/feedback`, reqBody)
  }

  // http://localhost:3000/user-downloads :get user by profile component when page loads
  getUserDownloadListAPI() {
    return this.http.get(`${this.server_url}/user-downloads`, this.appendToken())
  }

  // // http://localhost:3000/user-edit :put by profile when pic uploads
  editUserPictureAPI(reqBody: any) {
    return this.http.put(`${this.server_url}/user-edit`, reqBody, this.appendToken())
  }

  // feedback-approve : get by home page when it loads
  getApproveFeedbackAPI() {
    return this.http.get(`${this.server_url}/feedback-approve`)
  }


  // http://localhost:3000/user-list: get by admin users when page loads
  getUserListAPI() {
    return this.http.get(`${this.server_url}/user-list`, this.appendToken())
  }

  // download
  getDownloadListAPI() {
    return this.http.get(`${this.server_url}/downloads`, this.appendToken())
  }
  // http://localhost:3000/feedbacks: get by admin feedbacks
  getFeedbackListAPI() {
    return this.http.get(`${this.server_url}/feedbacks`, this.appendToken())
  }

  // http://localhost:3000/feedbacks/6978679f35623722ce4806b5 :put by feedback when approve/reject btn clicked
  updateFeedbackStatusAPI(id: string, reqBody: any) {
    return this.http.put(`${this.server_url}/feedbacks/${id}`, reqBody, this.appendToken())
  }

  // http://localhost:3000/recipes: post reqst by manage recip component when add btn clicked
  addRecipeAPI(reqBody: RecipeModel) {
    return this.http.post(`${this.server_url}/recipes`, reqBody, this.appendToken())
  }

  //http://localhost:3000/recipes/698190f53c76b69f7dc5154c :delete by recipes when delete btn clicked
  removeRecipeAPI(id: string) {
    return this.http.delete(`${this.server_url}/recipes/${id}`, this.appendToken())
  }

  //http://localhost:3000/recipes/6984b38842890bd6040ebd4e
   editRecipeAPI(id: string,reqBody:RecipeModel) {
    return this.http.put(`${this.server_url}/recipes/${id}`,reqBody, this.appendToken())
  }

      getChartData(){
      this.getDownloadListAPI().subscribe((res:any)=>{
      let downloadlistArray:any = []
      let output :any = {}
      res.forEach((item:any)=>{
        let cuisine = item.cuisine
        let currentCount = item.count
        if(cuisine in output){
          output[cuisine] += currentCount
        } else{
          output[cuisine] = currentCount

        }
      })
      console.log(output);
      
      for(let cuisine in output){
        downloadlistArray.push({name:cuisine,y:output[cuisine]})

      }
          localStorage.setItem("charts",JSON.stringify(downloadlistArray))
          
       })
      }

}
