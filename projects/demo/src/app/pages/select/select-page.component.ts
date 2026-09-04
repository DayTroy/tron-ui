import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TronErrorsDirective, TronSelectComponent } from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-select-page',
  standalone: true,
  imports: [ReactiveFormsModule, TronSelectComponent, TronErrorsDirective],
  templateUrl: './select-page.component.html',
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
