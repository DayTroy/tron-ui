import { computed, Directive, inject, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Destroyable } from './destroyable';

@Directive()
export abstract class TronControl<T> extends Destroyable implements ControlValueAccessor {
  readonly $value = model<T | null>(null, { alias: 'value' });
  readonly $disabled = input(false, { alias: 'disabled' });

  readonly ngControl = inject(NgControl, { optional: true, self: true });

  private readonly disabledByForm = signal(false);

  readonly $isDisabled = computed(() => this.$disabled() || this.disabledByForm());

  onChange: (value: T | null) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {
    super();
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: T | null): void {
    this.$value.set(value);
  }

  protected emitValue(value: T | null): void {
    this.$value.set(value);
    this.onChange(value);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledByForm.set(isDisabled);
  }
}
