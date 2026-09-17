# tron-ui

Standalone Angular 19 components. Catalog: [github.com/DayTroy/tron-ui](https://github.com/DayTroy/tron-ui).

## Install

```bash
npm install tron-ui @angular/cdk
```

Peer: Angular 19. Application styles must be SCSS.

## Setup

In `angular.json`:

```json
{
  "stylePreprocessorOptions": {
    "includePaths": ["node_modules/tron-ui/styles"]
  },
  "styles": [
    "src/styles.scss",
    "node_modules/tron-ui/styles/theme.scss"
  ]
}
```

App `.scss` can then `@use 'tokens'` and `@use 'mixins'`.

```scss
@use 'mixins' as *;

.page {
  @include mobile { padding: 1rem; }
  @include tablet { padding: 1.5rem; }
  @include desktop { padding: 2rem; }
}
```

## Use

```ts
import { Component } from '@angular/core';
import { TronButtonComponent } from 'tron-ui';

@Component({
  selector: 'app-login',
  imports: [TronButtonComponent],
  template: `<tron-button>Authenticate</tron-button>`,
})
export class LoginComponent {}
```
