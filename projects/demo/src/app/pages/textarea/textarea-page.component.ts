import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TronErrorsDirective, TronTextareaComponent } from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-textarea-page',
  standalone: true,
  imports: [ReactiveFormsModule, TronErrorsDirective, TronTextareaComponent],
  templateUrl: './textarea-page.component.html',
})
export class TextareaPageComponent {
  readonly readonly$ = signal(true);
  readonly log = new FormControl('');
  readonly brief = new FormControl('', [Validators.required, Validators.minLength(20)]);
  readonly transcript = new FormControl('Recovered fragment: the disc carries everything.');
}
