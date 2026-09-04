import { Component } from '@angular/core';
import { TronButtonComponent } from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-button-page',
  standalone: true,
  imports: [TronButtonComponent],
  templateUrl: './button-page.component.html',
})
export class ButtonPageComponent {}
