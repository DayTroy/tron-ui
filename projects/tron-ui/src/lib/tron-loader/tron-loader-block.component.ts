import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  TronLoaderComponent,
  TronLoaderSize,
  TronLoaderType,
  TronLoaderVariant,
} from './tron-loader.component';

@Component({
  selector: 'tron-loader-block',
  imports: [TronLoaderComponent],
  templateUrl: './tron-loader-block.component.html',
  styleUrl: './tron-loader-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    '[attr.aria-busy]': '$loading()',
  },
})
export class TronLoaderBlockComponent {
  readonly $loading = input<boolean>(false, { alias: 'loading' });
  readonly $message = input<string>('', { alias: 'message' });
  readonly $variant = input<TronLoaderVariant>('disc', { alias: 'variant' });
  readonly $size = input<TronLoaderSize>('md', { alias: 'size' });
  readonly $type = input<TronLoaderType>('primary', { alias: 'type' });
}
