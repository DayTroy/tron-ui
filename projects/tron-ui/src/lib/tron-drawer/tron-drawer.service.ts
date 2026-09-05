import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ComponentRef, inject, Injectable, TemplateRef } from '@angular/core';
import { TronDrawerComponent } from './tron-drawer.component';

export type TronDrawerContent<T = unknown> = TemplateRef<T> | ComponentType<T>;
export type TronDrawerPosition = 'start' | 'end';

export interface TronDrawerConfig {
  title: string;
  subtitle?: string;
  position?: TronDrawerPosition;
}

export class TronDrawerRef {
  constructor(private readonly onClose: () => void) {}

  close(): void {
    this.onClose();
  }
}

const LEAVE_MS = 200;

@Injectable({
  providedIn: 'root'
})
export class TronDrawerService {
  private readonly overlay = inject(Overlay);
  private overlayRef: OverlayRef | null = null;
  private host: ComponentRef<TronDrawerComponent> | null = null;
  private closing = false;
  private leaveTimer: ReturnType<typeof setTimeout> | null = null;

  show(content: TronDrawerContent, config: TronDrawerConfig): TronDrawerRef {
    this.disposeNow();

    const position = config.position ?? 'end';

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'tron-drawer-backdrop',
      panelClass: ['tron-drawer-pane', `tron-drawer-pane--${position}`],
      width: '100%',
      height: '100%',
      positionStrategy: this.overlay.position().global().top().left(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      disposeOnNavigation: true,
    });

    this.host = this.overlayRef.attach(new ComponentPortal(TronDrawerComponent));
    this.host.setInput('title', config.title);
    this.host.setInput('subtitle', config.subtitle ?? '');
    this.host.setInput('position', position);
    this.host.setInput('content', content);
    this.host.instance.close = () => this.hide();

    this.overlayRef.backdropClick().subscribe(() => this.hide());

    return new TronDrawerRef(() => this.hide());
  }

  hide(): void {
    if (!this.overlayRef || this.closing) return;

    this.closing = true;
    this.host?.instance.leave();
    this.overlayRef.backdropElement?.classList.add('tron-drawer-backdrop--leave');

    const panel = this.host?.location.nativeElement.querySelector('.tron-drawer');
    panel?.addEventListener('animationend', (event: AnimationEvent) => {
      if (event.target === panel) this.disposeNow();
    }, { once: true });

    this.leaveTimer = setTimeout(() => this.disposeNow(), LEAVE_MS + 50);
  }

  private disposeNow(): void {
    if (this.leaveTimer) {
      clearTimeout(this.leaveTimer);
      this.leaveTimer = null;
    }

    this.overlayRef?.dispose();
    this.overlayRef = null;
    this.host = null;
    this.closing = false;
  }
}
