import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-home-layout',
  imports: [RouterModule],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {
  constructor(private productsService: ProductsService) {

  }

  ngOnInit() {
    this.productsService.getProducts().subscribe(products => {
      console.log(products);
    });
  }
}
