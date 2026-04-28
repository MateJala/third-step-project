import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductCard } from '../../product-card/product-card';

@Component({
  selector: 'app-new-arrivals',
  imports: [ProductCard, RouterLink],
  templateUrl: './new-arrivals.html',
  styleUrl: './new-arrivals.scss',
})
export class NewArrivals {
  public isNew = signal<boolean>(true);
  constructor(private router: Router){}
  SortNewset(){
    this.router.navigate(['/shop'], { queryParams: {sort: 'newest'} });
  }
}
