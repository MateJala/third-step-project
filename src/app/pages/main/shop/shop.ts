import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop',
  imports: [RouterLink],
  templateUrl: './shop.html',
  styleUrl: './shop.scss',
})
export class Shop implements OnInit{
  constructor(private route: ActivatedRoute, private router: Router) {}

  public searchQueryParams : string | null = null
  public sortQueryParams : string | null = null
  public categoryQueryParams : number | null = null
  public minPriceQueryParams: number | null = null
  public maxPriceQueryParams : number | null = null
  public inStockQueryParams : boolean | null = null
  public minRatingQueryParams : number | null = null
  public brandQueryParams : string | null = null

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQueryParams = params['search'] ?? null
      this.sortQueryParams = params['sort'] ?? null
      this.categoryQueryParams = params['category'] ? +params['category'] : null
      this.minPriceQueryParams = params['minPrice'] ? +params['minPrice'] : null
      this.maxPriceQueryParams = params['maxPrice'] ? +params['maxPrice'] : null
      this.inStockQueryParams = params['inStock'] ? params['inStock'] === 'true' : null
      this.minRatingQueryParams = params['minRating'] ? +params['minRating'] : null
      this.brandQueryParams = params['brand'] ?? null
    });
  }


  selectRating(rating: number): void {
    this.minRatingQueryParams = this.minRatingQueryParams === rating ? null : rating;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { minRating: this.minRatingQueryParams ?? null },
      queryParamsHandling: 'merge',
    });
  }
  selectCategory(category: number): void {
    this.categoryQueryParams = this.categoryQueryParams === category ? null : category;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: this.categoryQueryParams ?? null },
      queryParamsHandling: 'merge',
    });
  }
  private priceDebounce: any = null;
  onPriceChange(type: 'min' | 'max', event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const parsed = value ? +value : null;

    if (type === 'min') this.minPriceQueryParams = parsed;
    if (type === 'max') this.maxPriceQueryParams = parsed;

    clearTimeout(this.priceDebounce);
    this.priceDebounce = setTimeout(() => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          minPrice: this.minPriceQueryParams ?? null,
          maxPrice: this.maxPriceQueryParams ?? null,
        },
        queryParamsHandling: 'merge',
      });
    }, 500);
  }
  private brandDebounce: any = null;
  onBrandInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.brandQueryParams = value ? value : null;

    clearTimeout(this.brandDebounce);
    this.brandDebounce = setTimeout(() => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { brand: this.brandQueryParams ?? null },
        queryParamsHandling: 'merge',
      });
    }, 500);
  }
  onStockInput(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.inStockQueryParams = checked ? true : null;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { inStock: this.inStockQueryParams ?? null },
      queryParamsHandling: 'merge',
    });
  }
  clearFilters(): void {
    this.searchQueryParams = null;
    this.sortQueryParams = null;
    this.categoryQueryParams = null;
    this.minPriceQueryParams = null;
    this.maxPriceQueryParams = null;
    this.inStockQueryParams = null;
    this.minRatingQueryParams = null;
    this.brandQueryParams = null;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }
  
}
