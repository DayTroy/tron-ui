# Tron UI
<img width="1512" height="793" alt="tron_lib_preview" src="https://github.com/user-attachments/assets/380e3567-e309-4394-9458-970db9ba605a" />

Angular UI kit. Dark grid, neon chrome. The [catalog](https://github.com/DayTroy/tron-ui) is the component docs.

## Install

```bash
npm install ngx-tron @angular/cdk
```
## Setup

In `angular.json`, point `includePaths` at the kit styles and put `theme.scss` in `styles[]`. Fonts, overlay, type and layout classes all come from that file.

```json
{
  "stylePreprocessorOptions": {
    "includePaths": ["node_modules/ngx-tron/styles"]
  },
  "styles": [
    "src/styles.scss",
    "node_modules/ngx-tron/styles/theme.scss"
  ]
}
```

## Use
Standalone components — import what you need.

```ts
import { Component } from '@angular/core';
import { TronButtonComponent } from 'ngx-tron';

@Component({
  selector: 'app-login',
  imports: [TronButtonComponent],
  template: `<tron-button>Authenticate</tron-button>`,
})
export class LoginComponent {}
```

HTML classes from the theme (`tron-display`, `tron-stack`, `tron-panel`, …) work without extra imports.

## This repo

Library: `projects/tron-ui`. Catalog app: `projects/demo`.

```bash
npm install
npx ng serve
```

Open [http://localhost:4200/](http://localhost:4200/).
