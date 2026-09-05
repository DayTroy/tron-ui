import { Component, signal } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { TronErrorsDirective, TronInputComponent, TronToggleComponent } from '../../../../../tron-ui/src/public-api';

function discSignature(control: AbstractControl): ValidationErrors | null {
  const value = (control.value ?? '') as string;
  if (!value || value.startsWith('TRON-')) return null;

  return { discSignature: { message: 'Signature must start with TRON-' } };
}

@Component({
  selector: 'app-input-page',
  standalone: true,
  imports: [ReactiveFormsModule, TronInputComponent, TronToggleComponent, TronErrorsDirective],
  templateUrl: './input-page.component.html',
})
export class InputPageComponent {
  readonly readonly$ = signal(false);
  readonly id = new FormControl('', [Validators.required, Validators.email, Validators.minLength(30)]);
  readonly disc = new FormControl('', [Validators.required, discSignature]);
}
