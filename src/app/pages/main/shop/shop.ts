import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductCard } from "../../../components/product-card/product-card";

@Component({
  selector: 'app-shop',
  imports: [RouterLink, CommonModule, ProductCard],
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

      if (params['sort']) {
        const found = this.options.find(o => o.value === params['sort']);
        if (found) {
          this.selectedLabel = found.label;
          this.selectedValue = found.value;
        }
      }
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
  private searchDebounce: any = null;
  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQueryParams = value ? value : null;

    clearTimeout(this.searchDebounce);
    this.searchDebounce = setTimeout(() => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { search: this.searchQueryParams ?? null },
        queryParamsHandling: 'merge',
      });
    }, 500);
  }
  public isSelectOpen = false;
  public selectedLabel = 'Sort by';
  public selectedValue = ''
  public options = [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Name: A-Z', value: 'name' },
    { label: 'Top Rated', value: 'rating' },
    { label: 'Newest', value: 'newest' },
  ];
  selectOption(option: { label: string, value: string }) {
    this.selectedLabel = option.label;
    this.selectedValue = option.value;
    this.isSelectOpen = false;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: option.value },
      queryParamsHandling: 'merge',
    });
  }
  removeFilter(filter: 'search' | 'category' | 'minPrice' | 'maxPrice' | 'inStock' | 'minRating' | 'brand'): void {
    switch (filter) {
      case 'search': this.searchQueryParams = null; break;
      case 'category': this.categoryQueryParams = null; break;
      case 'minPrice': this.minPriceQueryParams = null; break;
      case 'maxPrice': this.maxPriceQueryParams = null; break;
      case 'inStock': this.inStockQueryParams = null; break;
      case 'minRating': this.minRatingQueryParams = null; break;
      case 'brand': this.brandQueryParams = null; break;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [filter]: null },
      queryParamsHandling: 'merge',
    });
  }
  hasActiveFilters(): boolean {
    return !!(
      this.searchQueryParams ||
      this.sortQueryParams ||
      this.categoryQueryParams ||
      this.minPriceQueryParams ||
      this.maxPriceQueryParams ||
      this.inStockQueryParams ||
      this.minRatingQueryParams ||
      this.brandQueryParams
    );
  }
  public currentPage = 1;
  public totalPages = 4;
  public pageSize = 10;
  public isPageSizeOpen = false;
  public pageSizeOptions = [12, 24, 48, 10];
  selectPageSize(size: number): void {
    this.pageSize = size;
    this.isPageSizeOpen = false;
    this.currentPage = 1;
  }
  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  changePage(page: number): void {
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;
  }
  activeFilterCount(): number {
    let count = 0;
    if (this.searchQueryParams) count++;
    if (this.categoryQueryParams) count++;
    if (this.minPriceQueryParams) count++;
    if (this.maxPriceQueryParams) count++;
    if (this.inStockQueryParams) count++;
    if (this.minRatingQueryParams) count++;
    if (this.brandQueryParams) count++;
    return count;
  }

  public mobileFilterBtn = signal<boolean>(false)
  mobileFitler(){
    this.mobileFilterBtn.set(!this.mobileFilterBtn())
  }
}
