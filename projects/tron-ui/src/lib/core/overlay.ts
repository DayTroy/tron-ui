import { Overlay, OverlayRef, type ConnectedPosition } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';

export interface TronOverlayOptions {
  backdropClass: string;
  panelClass: string | string[];
}

@Injectable({
  providedIn: 'root'
})
export class TronOverlayService {
  private readonly overlay = inject(Overlay);

  /**
   * One full-screen pane pinned to the top left, so the panel places itself in CSS.
   * That is what lets dialog and drawer change their layout inside a media query.
   */
  createFullscreen(options: TronOverlayOptions): OverlayRef {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: options.backdropClass,
      panelClass: options.panelClass,
      width: '100%',
      height: '100%',
      positionStrategy: this.overlay.position().global().top().left(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      disposeOnNavigation: true,
    });
  }

  /**
   * Full-screen pane, no backdrop, no scroll lock. The host places itself in CSS.
   * Clicks fall through until a child sets pointer-events. Survives navigation.
   */
  createChrome(options: { panelClass: string | string[] }): OverlayRef {
    return this.overlay.create({
      hasBackdrop: false,
      panelClass: options.panelClass,
      width: '100%',
      height: '100%',
      positionStrategy: this.overlay.position().global().top().left(),
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      disposeOnNavigation: false,
    });
  }

  /**
   * Content-sized pane pinned to an origin. No backdrop, no scroll lock.
   * Follows the origin while it stays on screen (tooltip).
   */
  createAnchored(
    origin: HTMLElement,
    options: {
      panelClass: string | string[];
      positions: ConnectedPosition[];
    },
  ): OverlayRef {
    return this.overlay.create({
      hasBackdrop: false,
      panelClass: options.panelClass,
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(origin)
        .withFlexibleDimensions(false)
        .withPush(true)
        .withPositions(options.positions),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      disposeOnNavigation: true,
    });
  }
}
