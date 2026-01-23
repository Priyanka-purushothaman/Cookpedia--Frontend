import { Component, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterLink } from "@angular/router";
import { inject } from '@angular/core';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-home',
  imports: [Header, Footer, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  allRecipes: any = signal([])
  api = inject(ApiService)

  ngOnInit() {
    this.getAllRecipes()
  }

  getAllRecipes() {
    this.api.getAllRecipesAPI().subscribe((res: any) => {
      // console.log(res);
      this.allRecipes.set(res.slice(0, 6))
      console.log(this.allRecipes());
    })
  }
}
