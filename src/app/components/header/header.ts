import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { NgStyle } from "@angular/common";

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, NgStyle],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private router: Router){}
  search = new FormControl('');
  clearSearch(){
    this.search.setValue('');
  }
  Search(){
    this.router.navigate(['/shop'], { queryParams: { search: this.search.value } });
  }
}
