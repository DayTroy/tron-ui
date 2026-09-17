export interface CatalogNavItem {
  path: string;
  label: string;
}

export interface CatalogNavGroup {
  label: string;
  items: CatalogNavItem[];
}

export const CATALOG_NAV: CatalogNavGroup[] = [
  {
    label: 'Controls',
    items: [
      { path: '/button', label: 'Button' },
      { path: '/input', label: 'Input' },
      { path: '/textarea', label: 'Textarea' },
      { path: '/select', label: 'Select' },
      { path: '/toggle', label: 'Toggle' },
      { path: '/checkbox', label: 'Checkbox' },
      { path: '/radio', label: 'Radio' },
      { path: '/slider', label: 'Slider' },
    ],
  },
  {
    label: 'Navigation',
    items: [
      { path: '/tabs', label: 'Tabs' },
    ],
  },
  {
    label: 'Display',
    items: [
      { path: '/avatar', label: 'Avatar' },
      { path: '/chip', label: 'Chip' },
      { path: '/icon', label: 'Icon' },
      { path: '/progress', label: 'Progress' },
      { path: '/loader', label: 'Loader' },
      { path: '/stepper', label: 'Stepper' },
    ],
  },
  {
    label: 'Overlay',
    items: [
      { path: '/dialog', label: 'Dialog' },
      { path: '/drawer', label: 'Drawer' },
      { path: '/toast', label: 'Toast' },
      { path: '/tooltip', label: 'Tooltip' },
    ],
  },
  {
    label: 'Playground',
    items: [
      { path: '/form', label: 'Form' },
    ],
  },
];
