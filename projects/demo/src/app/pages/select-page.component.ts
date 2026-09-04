import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TronErrorsDirective, TronSelectComponent } from '../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-select-page',
  standalone: true,
  imports: [ReactiveFormsModule, TronSelectComponent, TronErrorsDirective],
  template: `
    <section class="catalog">
      <header class="catalog__head">
        <h1>Select</h1>
        <p>Single value, disabled option, required error.</p>
      </header>

      <div class="catalog__block">
        <h2>Field</h2>
        <tron-select
          label="Sector"
          placeholder="Choose sector"
          hint="Grid sector assignment"
          [formControl]="sector"
          [options]="sectors"
          tronErrors
        />
      </div>
    </section>
  `,
})
export class SelectPageComponent {
  readonly sector = new FormControl<string | null>(null, Validators.required);
  readonly sectors = [
    { value: 'core', label: 'Sector 1 - Core' },
    { value: 'archive', label: 'Sector 2 - Archive' },
    { value: 'transit', label: 'Sector 3 - Transit', disabled: true },
    { value: 'outlands', label: 'Sector 4 - Outlands' },
  ];
}
