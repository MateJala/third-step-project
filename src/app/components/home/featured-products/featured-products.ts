import { Component } from '@angular/core';
import { ProductCard } from '../../product-card/product-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-featured-products',
  imports: [ProductCard, RouterLink],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.scss',
})
export class FeaturedProducts {}
