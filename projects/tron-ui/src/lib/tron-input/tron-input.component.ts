import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, model, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NgControl } from '@angular/forms';

let nextId = 0;

@Component({
  selector: 'tron-input',
  imports: [],
  templateUrl: './tron-input.component.html',
  styleUrl: './tron-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronInputComponent implements ControlValueAccessor, OnInit {
  readonly $label = input<string>('', { alias: 'label' });
  readonly $placeholder = input<string>('', { alias: 'placeholder' });
  readonly $hint = input<string>('', { alias: 'hint' });
  readonly $readonly = input<boolean>(false, { alias: 'readonly' });
  readonly $disabled = input<boolean>(false, { alias: 'disabled' });
  readonly $type = input<'text' | 'password' | 'email' | 'number' | 'search' | 'tel'>('text', { alias: 'type' });
  readonly $value = model<string>('', { alias: 'value' });

  public readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destroyRef = inject(DestroyRef);

  protected readonly fieldId = `tron-input-${nextId++}`;
  private readonly disabledByForm = signal(false);
  private readonly formTick = signal(0);

  readonly $isDisabled = computed(() => this.$disabled() || this.disabledByForm());

  readonly $isInvalid = computed(() => {
    this.formTick();
    if (this.$isDisabled()) return false;
    const control = this.ngControl;
    return !!(control?.invalid && (control.dirty || control.touched));
  });

  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.ngControl?.control?.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.formTick.update(n => n + 1));
  }

  writeValue(value: string | null): void {
    this.$value.set(value ?? '');
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  registerOnChange(fn: (value: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  onInputChange(newValue: string): void {
    this.$value.set(newValue);
    this.onChange(newValue);
  }

  onBlur(): void {
    this.onTouched();
    this.formTick.update(n => n + 1);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledByForm.set(isDisabled);
  }
}
