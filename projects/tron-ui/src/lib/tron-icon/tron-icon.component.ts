import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export const TRON_ICON_NAMES = [
  'close',
  'check',
  'chevron-down',
  'chevron-left',
  'plus',
  'search',
  'user',
  'menu',
  'info',
  'warning',
  'error',
  'eye',
  'success',
  'lock',
] as const;

export type TronIconName = (typeof TRON_ICON_NAMES)[number];
export type TronIconSize = 'sm' | 'md' | 'lg';

interface IconPath {
  d: string;
  cap?: 'round' | 'square';
  join?: 'round';
}

interface IconCircle {
  cx: number;
  cy: number;
  r: number;
  fill?: boolean;
}

interface IconMark {
  paths?: IconPath[];
  circles?: IconCircle[];
}

const TRON_ICONS = new Map<TronIconName, IconMark>([
  ['close', { paths: [{ d: 'M5 5l6 6M11 5l-6 6', cap: 'round' }] }],
  ['check', { paths: [{ d: 'M3.5 8.2l3 3.1L12.5 4.8', cap: 'round', join: 'round' }] }],
  ['chevron-down', { paths: [{ d: 'M3.5 6L8 10.5 12.5 6', cap: 'round', join: 'round' }] }],
  ['chevron-left', { paths: [{ d: 'M10 3.5L5.5 8 10 12.5', cap: 'round', join: 'round' }] }],
  ['plus', { paths: [{ d: 'M8 3.5v9M3.5 8h9', cap: 'round' }] }],
  ['search', {
    circles: [{ cx: 7, cy: 7, r: 4.25 }],
    paths: [{ d: 'M10.2 10.2L13.5 13.5', cap: 'round' }],
  }],
  ['user', {
    circles: [{ cx: 8, cy: 5.5, r: 2.5 }],
    paths: [{ d: 'M3.5 13.25c.35-2.35 2.2-3.75 4.5-3.75s4.15 1.4 4.5 3.75', cap: 'round' }],
  }],
  ['menu', { paths: [{ d: 'M3 5h10M3 8h10M3 11h10', cap: 'square' }] }],
  ['info', {
    circles: [{ cx: 8, cy: 8, r: 6.5 }, { cx: 8, cy: 5.25, r: 0.7, fill: true }],
    paths: [{ d: 'M8 7.25v4', cap: 'round' }],
  }],
  ['warning', {
    paths: [
      { d: 'M8 2.5L14.5 13.5H1.5L8 2.5z', join: 'round' },
      { d: 'M8 6.75v3', cap: 'round' },
    ],
    circles: [{ cx: 8, cy: 11.5, r: 0.7, fill: true }],
  }],
  ['error', {
    circles: [{ cx: 8, cy: 8, r: 6.5 }],
    paths: [{ d: 'M6 6l4 4M10 6l-4 4', cap: 'round' }],
  }],
  ['eye', {
    paths: [{ d: 'M2 8s2.5-4.5 6-4.5S14 8 14 8s-2.5 4.5-6 4.5S2 8 2 8z', join: 'round' }],
    circles: [{ cx: 8, cy: 8, r: 1.75 }],
  }],
  ['success', {
    circles: [{ cx: 8, cy: 8, r: 6.5 }],
    paths: [{ d: 'M5 8.2l2.1 2.1L11.2 6', cap: 'round', join: 'round' }],
  }],
  ['lock', {
    paths: [
      { d: 'M4.5 7.25h7v6h-7z', join: 'round' },
      { d: 'M5.75 7.25V5.4a2.25 2.25 0 0 1 4.5 0v1.85', cap: 'round' },
    ],
  }],
]);

@Component({
  selector: 'tron-icon',
  imports: [],
  templateUrl: './tron-icon.component.html',
  styleUrl: './tron-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    '[class.tron-icon--sm]': '$size() === "sm"',
    '[class.tron-icon--md]': '$size() === "md"',
    '[class.tron-icon--lg]': '$size() === "lg"',
    '[attr.aria-hidden]': '$label() ? null : true',
    '[attr.role]': '$label() ? "img" : null',
    '[attr.aria-label]': '$label() || null',
  },
})
export class TronIconComponent {
  readonly $name = input.required<TronIconName>({ alias: 'name' });
  readonly $size = input<TronIconSize | null>(null, { alias: 'size' });
  readonly $label = input('', { alias: 'label' });

  protected readonly $icon = computed(() => this.getIcon(this.$name()));

  getIcon(name: TronIconName): IconMark {
    return TRON_ICONS.get(name) ?? {};
  }
}
