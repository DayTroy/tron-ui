import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, effect, inject, input, model, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';

let nextId = 0;

@Component({
  selector: 'tron-dialog',
  imports: [CdkTrapFocus],
  templateUrl: './tron-dialog.component.html',
  styleUrl: './tron-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronDialogComponent {
  readonly $open = model(false, { alias: 'open' });
  readonly $title = input.required<string>({ alias: 'title' });
  readonly $subtitle = input('', { alias: 'subtitle' });

  protected readonly titleId = `tron-dialog-title-${nextId++}`;

  private readonly overlay = inject(Overlay);
  private readonly vcr = inject(ViewContainerRef);
  private readonly panel = viewChild<TemplateRef<unknown>>('panel');
  private overlayRef: OverlayRef | null = null;

  constructor() {
    effect((onCleanup) => {
      const open = this.$open();
      const panel = this.panel();

      if (open && panel) {
        this.attach(panel);
      } else {
        this.detach();
      }

      onCleanup(() => this.detach());
    });
  }

  private attach(panel: TemplateRef<unknown>): void {
    if (this.overlayRef?.hasAttached()) return;

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'tron-dialog-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      disposeOnNavigation: true,
    });
    this.overlayRef.attach(new TemplatePortal(panel, this.vcr));
    this.overlayRef.backdropClick().subscribe(() => this.$open.set(false));
    this.overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
      if (event.key === 'Escape') this.$open.set(false);
    });
  }

  private detach(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }
}
