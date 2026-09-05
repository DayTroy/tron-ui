import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TronErrorsDirective,
  TronRadioComponent,
  TronRadioGroupComponent,
} from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-radio-page',
  standalone: true,
  imports: [ReactiveFormsModule, TronErrorsDirective, TronRadioComponent, TronRadioGroupComponent],
  templateUrl: './radio-page.component.html',
})
export class RadioPageComponent {
  readonly disc = new FormControl<string | null>('legacy');
  readonly speed = new FormControl<string | null>('fast');
  readonly clearance = new FormControl<string | null>(null, Validators.required);
}
