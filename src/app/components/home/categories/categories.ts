import { Component} from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {
  constructor(private router: Router){}
  routerLinkCategory(id:number){
    this.router.navigate(['/shop'], { queryParams: { category: id } });
  }
}
