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
  standalone: true,
})
export class TronErrorsDirective extends Destroyable implements OnInit {
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly host = inject(ElementRef<HTMLElement>);

  private componentRef: ComponentRef<TronErrorComponent> | null = null;
  private errors: string[] = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.componentRef = this.viewContainerRef.createComponent(TronErrorComponent);
    this.host.nativeElement.insertAdjacentElement('afterend', this.componentRef.location.nativeElement);
    this.initSubscriptions();
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
    this.errors = [];
    const control = this.ngControl?.control;

    if (control && !control.disabled && control.invalid && (control.dirty || control.touched) && control.errors) {
      for (const key of Object.keys(control.errors)) {
        this.errors.push(DEFAULT_ERRORS[key]);
      }
    }

    if (!this.componentRef) return;
    this.componentRef.instance.errors = this.errors;
  }
}
