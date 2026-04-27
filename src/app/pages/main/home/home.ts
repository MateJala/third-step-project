import { Component } from '@angular/core';
import { Hero } from '../../../components/home/hero/hero';
import { Categories } from '../../../components/home/categories/categories';

@Component({
  selector: 'app-home',
  imports: [Hero,Categories],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  
}
