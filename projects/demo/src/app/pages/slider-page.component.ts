import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TronSliderComponent } from '../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-slider-page',
  standalone: true,
  imports: [ReactiveFormsModule, TronSliderComponent],
  template: `
    <section class="catalog">
      <header class="catalog__head">
        <h1>Slider</h1>
        <p>Range with min, max, step.</p>
      </header>

      <div class="catalog__block">
        <h2>Condition</h2>
        <tron-slider [formControl]="condition" [min]="0" [max]="100" [step]="10" />
      </div>
    </section>
  `,
})
export class SliderPageComponent {
  readonly condition = new FormControl(40);
}
