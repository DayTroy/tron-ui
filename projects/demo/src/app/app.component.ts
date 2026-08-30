import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { TronStepperComponent, TronToggleComponent, TronProgressComponent, TronSliderComponent, TronInputComponent, TronErrorsDirective } from '../../../tron-ui/src/public-api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { TronButtonComponent } from '../../../tron-ui/src/lib/tron-button/tron-button.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule, TronButtonComponent, TronToggleComponent, TronStepperComponent, TronProgressComponent, TronSliderComponent, TronInputComponent, TronErrorsDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isDisabled$ = signal(false);
  name$ = signal('John');

  private readonly destroyRef = inject(DestroyRef);

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
    id: new FormControl('', [Validators.required, Validators.email, Validators.minLength(30)]),
    openField: new FormControl(false),
    condition: new FormControl(0)
  })

  get idFormCtrl() { return this.form.controls.id; }

  constructor() {}

  ngOnInit(): void {
    // this.initSubscriptions();
  }

  initSubscriptions() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => console.log(value));
  }

  disable() {
    this.form.controls.id.disable();
  }

  enable() {
    this.form.controls.id.enable();
  }

  derezz() {
    this.form.reset();
  }
}
