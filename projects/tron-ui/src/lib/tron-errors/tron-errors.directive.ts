import { afterNextRender, booleanAttribute, ComponentRef, DestroyRef, Directive, ElementRef, HostListener, inject, Injector, input, OnDestroy, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { TronErrorComponent } from './tron-error.component';

const DEFAULT_ERRORS: Record<string, string> = {
  email: 'Invalid email',
  minlength: 'Too short',
  maxlength: 'Too long',
  min: 'Value is too small',
  max: 'Value is too large',
  pattern: 'Invalid format',
};

@Directive({
  selector: '[tronErrors]',
  standalone: true,
})
export class TronErrorsDirective implements OnDestroy {
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly $enabled = input(true, { alias: 'tronErrors', transform: booleanAttribute });

  private componentRef: ComponentRef<TronErrorComponent> | null = null;
  private focused = false;
  private errors: string[] = [];

  constructor() {
    afterNextRender(() => this.mount(), { injector: this.injector });
  }

  @HostListener('focusin')
  onFocusIn(): void {
    this.focused = true;
  }

  @HostListener('focusout', ['$event'])
  onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (next && this.host.nativeElement.contains(next)) return;

    this.focused = false;
    queueMicrotask(() => this.updateErrorsMessage());
  }

  ngOnDestroy(): void {
    this.componentRef?.destroy();
    this.componentRef = null;
  }

  updateErrorsMessage(): void {
    this.errors = [];
    const control = this.ngControl?.control;

    if (control && !control.disabled && control.invalid && (control.dirty || control.touched) && control.errors) {
      for (const key of Object.keys(control.errors)) {
        this.errors.push(DEFAULT_ERRORS[key] ?? key);
      }
    }

    if (!this.componentRef) return;
    this.componentRef.instance.errors = this.errors;
  }

  private mount(): void {
    const control = this.ngControl?.control;
    if (!control || this.componentRef || !this.$enabled()) return;

    this.componentRef = this.viewContainerRef.createComponent(TronErrorComponent);
    this.host.nativeElement.insertAdjacentElement('afterend', this.componentRef.location.nativeElement);

    control.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateErrorsMessage());

    this.updateErrorsMessage();
  }
}
