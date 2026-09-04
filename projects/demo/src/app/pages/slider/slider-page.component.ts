import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TronSliderComponent } from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-slider-page',
  standalone: true,
  imports: [ReactiveFormsModule, TronSliderComponent],
  templateUrl: './slider-page.component.html',
})
export class SliderPageComponent {
  readonly condition = new FormControl(40);
  readonly level = new FormControl(40);
}
