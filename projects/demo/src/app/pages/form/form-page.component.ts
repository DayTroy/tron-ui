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
} from '../../../../../tron-ui/src/public-api';

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
  templateUrl: './form-page.component.html',
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
