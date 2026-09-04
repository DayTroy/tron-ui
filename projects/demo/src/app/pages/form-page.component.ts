import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TronButtonComponent,
  TronCheckboxComponent,
  TronErrorsDirective,
  TronInputComponent,
  TronSelectComponent,
  TronSliderComponent,
  TronToggleComponent,
} from '../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TronButtonComponent,
    TronCheckboxComponent,
    TronErrorsDirective,
    TronInputComponent,
    TronSelectComponent,
    TronSliderComponent,
    TronToggleComponent,
  ],
  template: `
    <section class="catalog">
      <header class="catalog__head">
        <h1>Form</h1>
        <p>Controls together: enable, disable, validation.</p>
      </header>

      <form class="catalog__stack" [formGroup]="form">
        <tron-input
          label="User Identifier"
          placeholder="Enter value"
          formControlName="id"
          [readonly]="readonly$()"
          tronErrors
        />

        <tron-toggle label="Control is readonly?" formControlName="openField" [(value)]="readonly$" />
        <tron-checkbox formControlName="alerts">Оповещения грида</tron-checkbox>
        <tron-slider formControlName="condition" [min]="0" [max]="100" [step]="10" />

        <tron-select
          label="Sector"
          placeholder="Choose sector"
          hint="Grid sector assignment"
          formControlName="sector"
          [options]="sectors"
          tronErrors
        />

        <div class="catalog__row">
          <tron-button (click)="enable()">Enable</tron-button>
          <tron-button variant="ghost" (click)="disable()">Disable</tron-button>
        </div>
      </form>
    </section>
  `,
})
export class FormPageComponent {
  readonly readonly$ = signal(false);

  readonly sectors = [
    { value: 'core', label: 'Sector 1 - Core' },
    { value: 'archive', label: 'Sector 2 - Archive' },
    { value: 'transit', label: 'Sector 3 - Transit', disabled: true },
    { value: 'outlands', label: 'Sector 4 - Outlands' },
  ];

  readonly form = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.email, Validators.minLength(30)]),
    openField: new FormControl(false),
    condition: new FormControl(0),
    sector: new FormControl<string | null>(null, Validators.required),
    alerts: new FormControl(false),
  });

  disable(): void {
    this.form.controls.id.disable();
    this.form.controls.sector.disable();
    this.form.controls.alerts.disable();
  }

  enable(): void {
    this.form.controls.id.enable();
    this.form.controls.sector.enable();
    this.form.controls.alerts.enable();
  }
}
