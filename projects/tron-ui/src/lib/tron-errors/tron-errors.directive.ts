import { afterNextRender, booleanAttribute, ComponentRef, Directive, ElementRef, HostListener, inject, Injector, input, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { Destroyable } from '../core/destroyable';
import { TronErrorComponent } from './tron-error.component';

const DEFAULT_ERRORS: Record<string, string> = {
  email: 'Invalid email',
  minlength: 'Too short',
  maxlength: 'Too long',
  min: 'Value is too small',
  max: 'Value is too large',
};

@Directive({
  selector: '[tronErrors]',
  standalone: true
})
export class TronErrorsDirective extends Destroyable implements OnInit {
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  private componentRef: ComponentRef<TronErrorComponent> | null = null;
  private errors: string[] = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.componentRef = this.viewContainerRef.createComponent(TronErrorComponent);
    this.mountTarget().appendChild(this.componentRef.location.nativeElement);
    this.initSubscriptions();
  }

  /**
   * Errors live in the field's own column, so the consumer's layout gap wraps the whole field.
   * A field marks that column with `data-tron-field` and orders its hint around the errors.
   */
  private mountTarget(): HTMLElement {
    const host = this.host.nativeElement;
    return host.querySelector<HTMLElement>('[data-tron-field]') ?? host;
  }

  private initSubscriptions(): void {
    this.ngControl?.control?.statusChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.updateErrorsMessage());

    this.destroyed$.subscribe(() => {
      this.componentRef?.destroy();
      this.componentRef = null;
    })
  }

  updateErrorsMessage(): void {
    this.errors = this.collectMessages();

    if (!this.componentRef) return;
    this.componentRef.instance.errors = this.errors;
  }

  private collectMessages(): string[] {
    const control = this.ngControl?.control;
    const isVisible = control && !control.disabled && control.invalid && (control.dirty || control.touched);

    if (!isVisible || !control.errors) return [];

    const messages: string[] = [];

    for (const [key, value] of Object.entries(control.errors)) {
      const message = this.resolveMessage(key, value);
      if (message) messages.push(message);
    }

    return messages;
  }

  /** Validator may carry its own text: `{ key: 'text' }` or `{ key: { message: 'text' } }`. */
  private resolveMessage(key: string, value: unknown): string | null {
    if (typeof value === 'string') return value || null;

    if (value && typeof value === 'object' && 'message' in value) {
      const message = (value as { message?: unknown }).message;
      if (typeof message === 'string' && message) return message;
    }

    return DEFAULT_ERRORS[key] ?? null;
  }
}
