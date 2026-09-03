import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { inject, Injectable, TemplateRef } from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
export class TronDrawerService {
  private readonly overlay = inject(Overlay);
  private overlayRef: OverlayRef | null = null;

  show(content: TronDrawerContent, config: TronDrawerConfig): TronDrawerRef {
    this.hide();

    const position = config.position ?? 'end';
    const global = this.overlay.position().global().top();

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'tron-drawer-backdrop',
      panelClass: 'tron-drawer-pane',
      width: '26rem',
      height: '100%',
      maxWidth: '100vw',
      positionStrategy: position === 'start' ? global.left() : global.right(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      disposeOnNavigation: true,
    });

    const host = this.overlayRef.attach(new ComponentPortal(TronDrawerComponent));
    host.setInput('title', config.title);
    host.setInput('subtitle', config.subtitle ?? '');
    host.setInput('position', position);
    host.setInput('content', content);
    host.instance.close = () => this.hide();

    this.overlayRef.backdropClick().subscribe(() => this.hide());

    return new TronDrawerRef(() => this.hide());
  }

  hide(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }
}
