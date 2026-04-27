import { Component } from '@angular/core';
import { Hero } from '../../../components/home/hero/hero';
import { Categories } from '../../../components/home/categories/categories';
import { FeaturedProducts } from '../../../components/home/featured-products/featured-products';

@Component({
  selector: 'app-home',
  imports: [Hero,Categories, FeaturedProducts],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  
}
