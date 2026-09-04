import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TronCheckboxComponent } from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-checkbox-page',
  standalone: true,
  imports: [ReactiveFormsModule, TronCheckboxComponent],
  templateUrl: './checkbox-page.component.html',
})
export class CheckboxPageComponent {
  readonly alerts = new FormControl(false);
}
