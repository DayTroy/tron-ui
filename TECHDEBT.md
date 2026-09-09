# Техдолг

## Формы и ошибки

### tronErrors
- Подписка только на `statusChanges`. Blur по уже `INVALID` полю не обновляет текст: статус не меняется, меняется `touched`. Слушать `control.events` (или status + value + ручной вызов на blur).

### `$isInvalid` / рамка ошибки
- `computed` читает `ngControl.invalid` / `touched`, это не signal. Рамка отстаёт от `touched`, пока не дёрнется другой signal.
- Копия в input / select / textarea / radio-group. У select внутри `$isInvalid` ещё читаются `$value()` и `$isOpen()`.
- Нужен общий tick в `TronControl` (status/events → signal), чтобы поля не копировали хак.

## Тосты

- Live-region: info/success — `role="status"` + `polite`; warning/danger — `role="alert"` + `assertive`. ×: `aria-label` уже есть, фокус не воровать.
- Выход-анимация (derezz в левую полосу). Сейчас только вход через `clip-path`. Выход режет DOM сразу — нужна задержка перед `dismiss`.

## Токены и тема

- Нет CSS-переменных. Смена темы = пересборка SCSS. Пока кит один вид — так и задумано.

## Следующие виджеты (не долг, бэклог)

- **tooltip** — Overlay уже в ките.
- Не в select (если всплывёт): multiple, поиск, группы, async, шаблон опции, clear, портал.

## Мелочи
- Кнопка, не блокер: loading, icon-only, `width: 100%` с хоста.
- Input: clear, глаз для password, `aria-describedby` — полировка поля, не новый виджет.
