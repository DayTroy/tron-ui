# Техдолг

Закрытое v1 не перечисляем. Сюда — то, что сознательно отложили или уже мешает.

## Формы и ошибки

### tronErrors
- Подписка только на `statusChanges`. Blur по уже `INVALID` полю не обновляет текст: статус не меняется, меняется `touched`. Слушать `control.events` (или status + value + ручной вызов на blur).
- В словаре нет `required`. В демо как раз `Validators.required`.
- Неизвестный ключ уходит в массив как `undefined`. Пушить строку, только если она есть в словаре.
- В директиве висят неиспользуемые импорты: `afterNextRender`, `booleanAttribute`, `HostListener`, `Injector`.

### `$isInvalid` / рамка ошибки
- `computed` читает `ngControl.invalid` / `touched`, это не signal. Рамка отстаёт от `touched`, пока не дёрнется другой signal.
- У select костыль: внутри `$isInvalid` читаются `$value()` и `$isOpen()`.
- Нужен общий tick в `TronControl` (status/events → signal), чтобы input / select / будущий textarea не копировали хак.

## Алерты (после v1)

- Live-region: info/success — `role="status"` + `polite`; warning/danger — `role="alert"` + `assertive`. ×: `aria-label` уже есть, фокус не воровать.
- Пауза таймера на hover.
- Выход-анимация (derezz в левую полосу). Сейчас только вход через `clip-path`. Выход режет DOM сразу — нужна задержка перед `dismiss`.
- CDK Overlay не нужен, пока нет dialog/tooltip. Outlet оставить. Пересадка тостов на Overlay — когда CDK уже в ките по другой причине.

## Кнопка

- Нет экспорта в `public-api.ts`. Демо импортирует файл напрямую (select и alert уже в public-api — демо тоже ходит в файлы).
- Мёртвый код в `.ts`: импорт `TronControl`, `nextId`.
- Потом, не блокер: loading, icon-only, `width: 100%` с хоста.

## Токены и тема

- Нет CSS-переменных. Смена темы = пересборка SCSS.
- Нет токена `z-index`. У select-панели и alert-outlet локальные числа.
- `violet` в палитре без семантической роли (классификация / badge).

## Следующие виджеты (не долг, бэклог)

По сложности:

1. **textarea** — `TronControl<string>`, почти input (`rows`, без `type`).
2. **checkbox / radio** — только если toggle + select мало.
3. **badge / chip** — токены `fill-subtle` уже есть.
4. **tooltip / dialog** — первый повод завести `@angular/cdk` Overlay (peer + overlay CSS). Select в скролле — тот же пакет.

Не в v1 select (если всплывёт): multiple, поиск, группы, async, шаблон опции, clear, портал.

## Мелочи

- Нет юнит-тестов.
- `tron-errors.directive.ts` — косметика trailing comma, не в коммитах.
- Input: hover, clear, глаз для password, `aria-describedby` — полировка поля, не новый виджет.
