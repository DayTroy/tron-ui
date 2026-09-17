import { Component } from '@angular/core';
import { TronButtonComponent } from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-type-page',
  standalone: true,
  imports: [TronButtonComponent],
  templateUrl: './type-page.component.html',
})
export class TypePageComponent {}
