import { Component, effect, signal } from '@angular/core';
import { TronStepperComponent, TronToggleComponent, TronProgressComponent, TronSliderComponent, TronInputComponent } from '../../../tron-ui/src/public-api';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, TronToggleComponent, TronStepperComponent, TronProgressComponent, TronSliderComponent, TronInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLogged$ = signal(false);
  name$ = signal('John');

  readonly data = [
    {
      name: 'IDENTITY'
    },
    {
      name: 'ACCESS'
    },
    {
      name: 'LOAD'
    },
    {
      name: 'INITIALIZATION'
    },
  ]

  $sliderValue = signal(0);

  readonly form = new FormGroup({
    id: new FormControl('Alexander')
  })

  get idFormCtrl() { return this.form.controls.id; }

    constructor() {
      effect(() => {
        if (this.isLogged$()) {
          console.log(this.name$());
        } else {
          console.log('LoggedOut')
        }
      })

      setTimeout(() => {
        this.name$.set('Adrian');
      }, 1000);

      setTimeout(() => {
        this.isLogged$.set(true);
      }, 2000);

      setTimeout(() => {
        this.name$.set('Nick');
      }, 3000);
    }
}
