import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  constructor(private router: Router){}
  SortNewset(){
    this.router.navigate(['/shop'], { queryParams: {sort: 'newest'} });
  }
}
