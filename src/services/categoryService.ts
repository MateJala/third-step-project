import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface Category {
  id: number,
  name: string,
  imageUrl: string,
  description: string,
  productCount: number,
  canDelete: boolean
}

export interface CategoryResponse {
  data: Category[],
  meta: {
    name: string,
    description: string,
    website: string,
    location: string,
    email: string
  }
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private url :string = 'https://shopapi.stepacademy.ge/api/categories';

  GetCategories(){
    return this.http.get<CategoryResponse>(this.url)
  }
}
