import { ChangeDetectionStrategy, Component, computed, input, linkedSignal } from '@angular/core';

export type TronAvatarType = 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'special';
export type TronAvatarSize = 'sm' | 'md' | 'lg';
export type TronAvatarStatus = 'online' | 'away' | 'busy' | 'offline';

/** Две буквы: третья в квадрате 32px уже не читается. */
const GLYPH_LIMIT = 2;

@Component({
  selector: 'tron-avatar',
  imports: [],
  templateUrl: './tron-avatar.component.html',
  styleUrl: './tron-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    // role встаёт только вместе с именем: img без доступного имени хуже, чем
    // отсутствие роли — экранный читатель объявит «изображение» и замолчит.
    '[attr.role]': "$label() ? 'img' : null",
    '[attr.aria-label]': '$label() || null',
  },
})
export class TronAvatarComponent {
  readonly $name = input<string>('', { alias: 'name' });
  readonly $initials = input<string>('', { alias: 'initials' });
  readonly $src = input<string>('', { alias: 'src' });
  readonly $type = input<TronAvatarType>('primary', { alias: 'type' });
  readonly $size = input<TronAvatarSize>('md', { alias: 'size' });
  readonly $status = input<TronAvatarStatus | null>(null, { alias: 'status' });

  /**
   * Битая ссылка роняет аватар на инициалы. linkedSignal, а не signal: смена
   * src обнуляет отказ сама, иначе следующая картинка не получила бы попытки.
   */
  private readonly $failed = linkedSignal<string, boolean>({
    source: this.$src,
    computation: () => false,
  });

  protected readonly $hasImage = computed(() => !!this.$src() && !this.$failed());

  /**
   * Инициалы: по первой букве двух слов, а из одного слова — первые две.
   * Явный initials перебивает разбор: у имён вида «Quorra» сокращение бывает
   * фирменным, и угадать его нельзя.
   */
  protected readonly $glyphs = computed(() => {
    const explicit = this.$initials().trim();
    if (explicit) return explicit.slice(0, GLYPH_LIMIT).toUpperCase();

    const words = this.$name().trim().split(/\s+/).filter(Boolean);
    if (!words.length) return '';

    const letters =
      words.length > 1
        ? words.slice(0, GLYPH_LIMIT).map((word) => word[0])
        : [...words[0].slice(0, GLYPH_LIMIT)];

    return letters.join('').toUpperCase();
  });

  /**
   * Читателю нужно имя, а не инициалы: «TR» он произнесёт по буквам. Статус
   * входит в то же имя, потому что цветной квадрат в углу иначе не озвучится.
   */
  readonly $label = computed(() => {
    const name = this.$name().trim();
    if (!name) return '';

    const status = this.$status();
    return status ? `${name}, ${status}` : name;
  });

  protected readonly $classes = computed(() =>
    [`tron-avatar--${this.$type()}`, `tron-avatar--${this.$size()}`].join(' ')
  );

  protected onImageError(): void {
    this.$failed.set(true);
  }
}
