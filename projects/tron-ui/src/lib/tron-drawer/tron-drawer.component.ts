import { CdkTrapFocus } from '@angular/cdk/a11y';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { type TronDrawerContent, type TronDrawerPosition } from './tron-drawer.service';

let nextId = 0;

@Component({
  selector: 'tron-drawer',
  imports: [CdkTrapFocus, NgComponentOutlet, NgTemplateOutlet],
  templateUrl: './tron-drawer.component.html',
  styleUrl: './tron-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class TronDrawerComponent {
  readonly $title = input.required<string>({ alias: 'title' });
  readonly $subtitle = input('', { alias: 'subtitle' });
  readonly $position = input<TronDrawerPosition>('end', { alias: 'position' });
  readonly $content = input.required<TronDrawerContent>({ alias: 'content' });

  protected readonly $template = computed(() => {
    const content = this.$content();
    return content instanceof TemplateRef ? content : null;
  });

  protected readonly $component = computed(() => {
    const content = this.$content();
    return content instanceof TemplateRef ? null : content;
  });

  protected readonly titleId = `tron-drawer-title-${nextId++}`;

  close = () => {};
}
