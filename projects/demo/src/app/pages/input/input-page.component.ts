import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TronErrorsDirective, TronInputComponent, TronToggleComponent } from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-input-page',
  standalone: true,
  imports: [ReactiveFormsModule, TronInputComponent, TronToggleComponent, TronErrorsDirective],
  templateUrl: './input-page.component.html',
})
export class InputPageComponent {
  readonly readonly$ = signal(false);
  readonly id = new FormControl('', [Validators.required, Validators.email, Validators.minLength(30)]);
}
