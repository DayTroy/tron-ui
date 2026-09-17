import { OverlayRef, type ConnectedPosition } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, DestroyRef, Directive, ElementRef, inject, input, OnDestroy } from '@angular/core';
import { TronOverlayService } from '../core/overlay';
import { TronTooltipComponent } from './tron-tooltip.component';

export type TronTooltipPosition = 'top' | 'bottom' | 'start' | 'end';

const SHOW_DELAY = 200;
const GAP = 8;

let nextId = 0;

@Directive({
  selector: '[tronTooltip]',
  standalone: true,
})
export class TronTooltipDirective implements OnDestroy {
  readonly $text = input('', { alias: 'tronTooltip' });
  readonly $position = input<TronTooltipPosition>('top', { alias: 'tronTooltipPosition' });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly overlays = inject(TronOverlayService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly tooltipId = `tron-tooltip-${nextId++}`;
  private overlayRef: OverlayRef | null = null;
  private panel: ComponentRef<TronTooltipComponent> | null = null;
  private described: HTMLElement | null = null;
  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private hovered = false;
  private focused = false;

  constructor() {
    const el = this.host.nativeElement;
    this.listen(el, 'mouseenter', () => this.onPointerEnter());
    this.listen(el, 'mouseleave', () => this.onPointerLeave());
    this.listen(el, 'focusin', () => this.onFocusIn());
    this.listen(el, 'focusout', (event) => this.onFocusOut(event as FocusEvent));
    this.listen(el, 'keydown', (event) => {
      if ((event as KeyboardEvent).key === 'Escape') this.onEscape();
    });
  }

  private onPointerEnter(): void {
    this.hovered = true;
    this.scheduleShow();
  }

  private onPointerLeave(): void {
    this.hovered = false;
    this.scheduleHide();
  }

  private onFocusIn(): void {
    this.focused = true;
    this.show();
  }

  private onFocusOut(event: FocusEvent): void {
    if (this.host.nativeElement.contains(event.relatedTarget as Node)) return;
    this.focused = false;
    this.scheduleHide();
  }

  private onEscape(): void {
    this.hovered = false;
    this.focused = false;
    this.hide();
  }

  ngOnDestroy(): void {
    this.hide();
  }

  private listen(el: HTMLElement, type: string, handler: EventListener): void {
    el.addEventListener(type, handler);
    this.destroyRef.onDestroy(() => el.removeEventListener(type, handler));
  }

  private scheduleShow(): void {
    if (this.overlayRef) return;
    this.clearShowTimer();
    this.showTimer = setTimeout(() => this.show(), SHOW_DELAY);
  }

  private scheduleHide(): void {
    this.clearShowTimer();
    if (this.hovered || this.focused) return;
    this.hide();
  }

  private show(): void {
    this.clearShowTimer();
    const text = this.$text().trim();
    if (!text) {
      this.hide();
      return;
    }

    if (this.panel) {
      this.panel.setInput('text', text);
      return;
    }

    this.overlayRef = this.overlays.createAnchored(this.host.nativeElement, {
      panelClass: 'tron-tooltip-pane',
      positions: this.positions(),
    });
    this.panel = this.overlayRef.attach(new ComponentPortal(TronTooltipComponent));
    this.panel.setInput('text', text);
    this.panel.setInput('id', this.tooltipId);
    this.markDescribed();
    this.overlayRef.detachments().subscribe(() => {
      this.clearDescribed();
      this.overlayRef = null;
      this.panel = null;
    });
  }

  private hide(): void {
    this.clearShowTimer();
    this.clearDescribed();
    this.overlayRef?.dispose();
    this.overlayRef = null;
    this.panel = null;
  }

  private markDescribed(): void {
    this.clearDescribed();
    const host = this.host.nativeElement;
    const target = host.matches('button, a, [tabindex], input, textarea, select')
      ? host
      : host.querySelector<HTMLElement>('button, a, [tabindex], input, textarea, select') ?? host;
    target.setAttribute('aria-describedby', this.tooltipId);
    this.described = target;
  }

  private clearDescribed(): void {
    this.described?.removeAttribute('aria-describedby');
    this.described = null;
  }

  private clearShowTimer(): void {
    if (!this.showTimer) return;
    clearTimeout(this.showTimer);
    this.showTimer = null;
  }

  private positions(): ConnectedPosition[] {
    const top: ConnectedPosition = {
      originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -GAP,
    };
    const bottom: ConnectedPosition = {
      originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: GAP,
    };
    const start: ConnectedPosition = {
      originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -GAP,
    };
    const end: ConnectedPosition = {
      originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: GAP,
    };

    switch (this.$position()) {
      case 'bottom': return [bottom, top, start, end];
      case 'start':  return [start, end, top, bottom];
      case 'end':    return [end, start, top, bottom];
      default:       return [top, bottom, start, end];
    }
  }
}
