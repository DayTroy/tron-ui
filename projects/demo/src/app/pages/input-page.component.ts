import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TronErrorsDirective, TronInputComponent, TronToggleComponent } from '../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-input-page',
  standalone: true,
  imports: [ReactiveFormsModule, TronInputComponent, TronToggleComponent, TronErrorsDirective],
  template: `
    <section class="catalog">
      <header class="catalog__head">
        <h1>Input</h1>
        <p>Label, prefix, readonly, validation via tronErrors.</p>
      </header>

      <div class="catalog__block">
        <h2>Field</h2>
        <div class="catalog__stack">
          <tron-toggle label="Readonly" [(value)]="readonly$" />
          <tron-input
            label="User Identifier"
            placeholder="Enter value"
            [formControl]="id"
            [readonly]="readonly$()"
            tronErrors
          >
            <ng-container ngProjectAs="[tronPrefix]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.0754 12.2412V11.0753C11.0754 9.78758 10.0315 8.74365 8.74372 8.74365H5.24622C3.95847 8.74365 2.91455 9.78758 2.91455 11.0753V12.2412" stroke="#4A9AB5" stroke-width="1.16583" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.66357 4.0802C4.66357 5.36708 5.70836 6.41187 6.99524 6.41187C8.28212 6.41187 9.32691 5.36708 9.32691 4.0802C9.32691 2.79332 8.28212 1.74854 6.99524 1.74854C5.70836 1.74854 4.66357 2.79332 4.66357 4.0802V4.0802" stroke="#4A9AB5" stroke-width="1.16583" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </ng-container>
          </tron-input>
          <tron-input label="Access code" type="password" placeholder="••••••••" />
        </div>
      </div>
    </section>
  `,
})
export class InputPageComponent {
  readonly readonly$ = signal(false);
  readonly id = new FormControl('', [Validators.required, Validators.email, Validators.minLength(30)]);
}
