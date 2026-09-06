import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { TronLoaderComponent, TronLoaderType, TronLoaderVariant } from './tron-loader.component';

@Component({
  selector: 'tron-loader-overlay',
  imports: [TronLoaderComponent],
  templateUrl: './tron-loader-overlay.component.html',
  styleUrl: './tron-loader-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // The backdrop and pane live outside this view, so their styles cannot be scoped.
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class TronLoaderOverlayComponent {
  readonly $message = input<string>('', { alias: 'message' });
  readonly $variant = input<TronLoaderVariant>('disc', { alias: 'variant' });
  readonly $type = input<TronLoaderType>('primary', { alias: 'type' });
}
