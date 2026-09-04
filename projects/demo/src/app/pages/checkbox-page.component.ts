import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TronCheckboxComponent } from '../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-checkbox-page',
  standalone: true,
  imports: [ReactiveFormsModule, TronCheckboxComponent],
  template: `
    <section class="catalog">
      <header class="catalog__head">
        <h1>Checkbox</h1>
        <p>Boolean control, works with reactive forms.</p>
      </header>

      <div class="catalog__block">
        <h2>States</h2>
        <div class="catalog__stack">
          <tron-checkbox [formControl]="alerts">Оповещения грида</tron-checkbox>
          <tron-checkbox [disabled]="true">Offline</tron-checkbox>
        </div>
      </div>
    </section>
  `,
})
export class CheckboxPageComponent {
  readonly alerts = new FormControl(false);
}
