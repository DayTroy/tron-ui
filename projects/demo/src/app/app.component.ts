import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { TronStepperComponent, TronToggleComponent, TronProgressComponent, TronSliderComponent, TronInputComponent, TronErrorsDirective } from '../../../tron-ui/src/public-api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { TronButtonComponent } from '../../../tron-ui/src/lib/tron-button/tron-button.component';
import { TronSelectComponent } from '../../../tron-ui/src/lib/tron-select/tron-select.component';
import { TronAlertOutletComponent } from '../../../tron-ui/src/lib/tron-alert/tron-alert-outlet.component';
import { TronAlertService } from '../../../tron-ui/src/lib/tron-alert/tron-alert.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule, TronButtonComponent, TronToggleComponent, TronSelectComponent, TronAlertOutletComponent, TronStepperComponent, TronProgressComponent, TronSliderComponent, TronInputComponent, TronErrorsDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isDisabled$ = signal(false);
  name$ = signal('John');

  private readonly destroyRef = inject(DestroyRef);
  private readonly alerts = inject(TronAlertService);

  readonly sectors = [
    { value: 'core', label: 'Sector 1 - Core' },
    { value: 'archive', label: 'Sector 2 - Archive' },
    { value: 'transit', label: 'Sector 3 - Transit', disabled: true },
    { value: 'outlands', label: 'Sector 4 - Outlands' },
  ];


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
    condition: new FormControl(0),
    sector: new FormControl<string | null>(null, Validators.required),
  });

  get idFormCtrl() { return this.form.controls.id; };

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
    this.form.controls.sector.disable();  
  }

  enable() {
    this.form.controls.id.enable();
    this.form.controls.sector.enable();
  }

  notifyInfo(): void {
    this.alerts.info(
      'Network Sync Complete',
      'Grid connection established on port 2048. All sectors responding normally.'
    );
  }

  notifySuccess(): void {
    this.alerts.success(
      'User Program Recognized',
      'Identity verified. Welcome to the Grid. System resources allocated successfully.'
    );
  }

  notifyWarning(): void {
    this.alerts.warning(
      'Sector 12 Anomaly Detected',
      'Unusual data patterns observed in grid sector 12. MCP monitoring activated.'
    );
  }

  notifyDanger(): void {
    this.alerts.danger(
      'FATAL: Memory Corruption',
      'Critical system failure in partition 0x3E8. Emergency derezzification protocol engaged.'
    );
  }

  derezz() {
    this.form.reset();
  }
}
