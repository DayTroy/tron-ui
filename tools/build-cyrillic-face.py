#!/usr/bin/env python3
"""Собирает кириллические заглавные из латиницы Orbitron.

Кириллицы у Orbitron нет, а кит набирает ей всю caps-текстовку. Половина букв
здесь не рисуется заново: они объявляются составными глифами — ссылками на
латинские контуры, иногда с зеркалом. Остальные строятся из параметров самого
шрифта, снятых с его контуров: обводка, радиусы скруглений и доли, по которым
Orbitron строит дуги. Поэтому пропорции совпадают с оригиналом, а не подобраны
на глаз.

Orbitron под OFL 1.1 с оговоркой Reserved Font Name, поэтому производная обязана
называться иначе и остаётся под тем же OFL: см. FAMILY.
"""

import array
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.ttLib.tables import ttProgram
from fontTools.ttLib.tables._g_l_y_f import Glyph, GlyphComponent, GlyphCoordinates
from fontTools.varLib.instancer import instantiateVariableFont

SRC = Path('projects/demo/public/fonts/Orbitron-Latin.ttf')
DST = Path('tools/out/TronDisplay-Cyrillic.ttf')
FAMILY = 'Tron Display'

# Кит использует Orbitron только в начертании 400, поэтому переменная ось
# фиксируется: иначе каждый новый контур пришлось бы снабжать деформациями.
WEIGHT = 400

# ─── Параметры, снятые с контуров самого Orbitron ─────────────────────────────
CAP = 720      # высота заглавных
STROKE = 81    # толщина обводки: одна и та же у стоек и перекладин
LSB = 57       # левый полуапрош прямых букв (H, E, I, L, T)
RSB = 56       # правый полуапрош
R_OUT = 120    # радиус внешнего скругления (A, B, C, O, U)
R_IN = R_OUT - STROKE  # внутренний радиус: обводка постоянна, значит 39
MID = 319      # низ средней перекладины (H, E, K)
TAIL = 140     # выносной хвост Ц и Щ под базовой линией

# Доли радиуса, по которым Orbitron строит дугу. Внешняя дуга — три внеконтурные
# точки, внутренняя — две; числа сняты с A и совпадают с ней до единицы.
ARC_OUT = ((0.275, 0.0), (0.733, 0.267), (1.0, 0.725))
ARC_IN = ((0.41, 0.0), (1.0, 0.59))

# ─── Буквы, которые берутся ссылкой на латинский контур ──────────────────────
# З берёт форму тройки: в шрифте с квадратной геометрией это та же конструкция.
CLONE = {
    'А': 'A', 'В': 'B', 'Е': 'E', 'З': 'three', 'К': 'K', 'М': 'M',
    'Н': 'H', 'О': 'O', 'Р': 'P', 'С': 'C', 'Т': 'T', 'У': 'Y', 'Х': 'X',
}
MIRROR = {'И': 'N', 'Я': 'R'}   # зеркало по вертикальной оси
STEMMED = {'Ж': 'X'}            # базовая буква плюс вертикаль в середину

CAP_ACCENT_RAISE = 140  # приём самого Orbitron: знак над заглавной


def cyr(char: str) -> str:
    return f'uni{ord(char):04X}'


# ─── Примитивы контуров ──────────────────────────────────────────────────────

def corner(vertex, incoming, outgoing, radius, fractions=ARC_OUT):
    """Скругление угла приёмом Orbitron: дуга внеконтурными точками.

    incoming — направление подхода к углу, outgoing — направление отхода.
    Возвращает точки от начала дуги до её конца включительно.
    """
    (vx, vy), (ax, ay), (bx, by) = vertex, incoming, outgoing
    sx, sy = vx - ax * radius, vy - ay * radius
    points = [(sx, sy, True)]
    for along, across in fractions:
        points.append((sx + ax * along * radius + bx * across * radius,
                       sy + ay * along * radius + by * across * radius, False))
    points.append((sx + (ax + bx) * radius, sy + (ay + by) * radius, True))
    return points


def rounded_bowl(x0, y0, x1, y1, radius, fractions=ARC_OUT):
    """Прямоугольник со скруглёнными правыми углами: левая сторона примыкает к стойке."""
    return [
        (x0, y1, True),
        *corner((x1, y1), (1, 0), (0, -1), radius, fractions),
        *corner((x1, y0), (0, -1), (-1, 0), radius, fractions),
        (x0, y0, True),
    ]


def signed_area(contour) -> float:
    total = 0.0
    for i, (x1, y1, _) in enumerate(contour):
        x2, y2, _ = contour[(i + 1) % len(contour)]
        total += x1 * y2 - x2 * y1
    return total / 2


def orient(contour, clockwise: bool):
    negative = signed_area(contour) < 0
    return contour if negative == clockwise else list(reversed(contour))


def simple_glyph(glyf, contours, width):
    """Собирает глиф из готовых контуров: внешние по часовой, внутренние против."""
    glyph = Glyph()
    glyph.numberOfContours = len(contours)
    coords, flags, ends = [], [], []
    for contour in contours:
        for x, y, on_curve in contour:
            coords.append((round(x), round(y)))
            flags.append(1 if on_curve else 0)
        ends.append(len(coords) - 1)
    glyph.coordinates = GlyphCoordinates(coords)
    glyph.flags = array.array('B', flags)
    glyph.endPtsOfContours = ends
    glyph.program = ttProgram.Program()
    glyph.program.fromBytecode(b'')
    glyph.recalcBounds(glyf)
    return glyph, width


def component(glyph_name, x=0, y=0, transform=None):
    comp = GlyphComponent()
    comp.glyphName = glyph_name
    comp.x, comp.y = round(x), round(y)
    comp.flags = 0x04  # ROUND_XY_TO_GRID, как в готовых составных этого шрифта
    if transform is not None:
        comp.transform = transform
    return comp


def composite(*components):
    glyph = Glyph()
    glyph.numberOfContours = -1
    glyph.components = list(components)
    return glyph


def copy_contours(glyf, name, scale_x=1, dx=0, dy=0):
    """Переносит контуры готового глифа, при scale_x = -1 — зеркалит."""
    points, ends, flags = glyf[name].getCoordinates(glyf)
    contours, start = [], 0
    for end in ends:
        contour = [(points[i][0] * scale_x + dx, points[i][1] + dy, bool(flags[i] & 1))
                   for i in range(start, end + 1)]
        contours.append(list(reversed(contour)) if scale_x < 0 else contour)
        start = end + 1
    return contours


# ─── Буквы, которые приходится строить ───────────────────────────────────────

def stem(x, y0=0, y1=CAP):
    return [(x, y0, True), (x, y1, True), (x + STROKE, y1, True), (x + STROKE, y0, True)]


def bar(x0, x1, y0, y1):
    return [(x0, y0, True), (x0, y1, True), (x1, y1, True), (x1, y0, True)]


def arch(x0, x1, y0=0, y1=CAP, slant=0):
    """Скелет П: две стойки и перекладина сверху. slant наклоняет левую ногу — так
    из того же скелета получается Л, отличимая от П."""
    inner_top = y1 - STROKE
    lean = slant * (inner_top - y0) / (y1 - y0) if slant else 0
    return [
        (x0, y0, True),
        (x0 + slant, y1, True),
        (x1, y1, True),
        (x1, y0, True),
        (x1 - STROKE, y0, True),
        (x1 - STROKE, inner_top, True),
        (x0 + STROKE + lean, inner_top, True),
        (x0 + STROKE, y0, True),
    ]


def soft_sign(x0, bowl_top, width, top_bar=None):
    """Скелет Ь: стойка во всю высоту плюс нижняя чаша со скруглением справа.
    Из него же получаются Ъ, Ы и Б — им дописывается перекладина или вторая стойка."""
    right = x0 + width
    outer = [
        (x0, 0, True),
        (x0, CAP, True),
        (x0 + STROKE, CAP, True),
        (x0 + STROKE, bowl_top, True),
        *corner((right, bowl_top), (1, 0), (0, -1), R_OUT),
        *corner((right, 0), (0, -1), (-1, 0), R_OUT),
    ]
    counter = rounded_bowl(x0 + STROKE, STROKE, right - STROKE, bowl_top - STROKE,
                           R_IN, ARC_IN)
    contours = [orient(outer, True), orient(counter, False)]
    if top_bar:
        contours.append(orient(bar(*top_bar, CAP - STROKE, CAP), True))
    return contours


def build_letters(glyf, hmtx):
    letters = {}

    # П, Г, Ш, Щ, Ц, Ч — прямые буквы, углы острые, как у H, E, I, L, T.
    letters[cyr('П')] = simple_glyph(glyf, [orient(arch(LSB, 851 - RSB), True)], 851)

    letters[cyr('Г')] = simple_glyph(glyf, [orient([
        (LSB, 0, True), (LSB, CAP, True), (766 - RSB, CAP, True),
        (766 - RSB, CAP - STROKE, True), (LSB + STROKE, CAP - STROKE, True),
        (LSB + STROKE, 0, True),
    ], True)], 766)

    sha_right = 956 - RSB
    sha_mid = (LSB + sha_right - STROKE) / 2
    sha = [
        (LSB, 0, True), (LSB, CAP, True), (LSB + STROKE, CAP, True),
        (LSB + STROKE, STROKE, True), (sha_mid, STROKE, True), (sha_mid, CAP, True),
        (sha_mid + STROKE, CAP, True), (sha_mid + STROKE, STROKE, True),
        (sha_right - STROKE, STROKE, True), (sha_right - STROKE, CAP, True),
        (sha_right, CAP, True), (sha_right, 0, True),
    ]
    letters[cyr('Ш')] = simple_glyph(glyf, [orient(sha, True)], 956)
    letters[cyr('Щ')] = simple_glyph(glyf, [
        orient(sha, True),
        orient(bar(sha_right - STROKE, sha_right, -TAIL, 0), True),
    ], 956 + STROKE)

    tse_right = 851 - RSB
    tse = [
        (LSB, 0, True), (LSB, CAP, True), (LSB + STROKE, CAP, True),
        (LSB + STROKE, STROKE, True), (tse_right - STROKE, STROKE, True),
        (tse_right - STROKE, CAP, True), (tse_right, CAP, True), (tse_right, 0, True),
    ]
    letters[cyr('Ц')] = simple_glyph(glyf, [
        orient(tse, True),
        orient(bar(tse_right - STROKE, tse_right, -TAIL, 0), True),
    ], 851 + STROKE)

    che_right = 812 - RSB
    letters[cyr('Ч')] = simple_glyph(glyf, [orient([
        (che_right - STROKE, 0, True), (che_right - STROKE, MID, True),
        (LSB, MID, True), (LSB, CAP, True), (LSB + STROKE, CAP, True),
        (LSB + STROKE, MID + STROKE, True), (che_right, MID + STROKE, True),
        (che_right, 0, True),
    ], True)], 812)

    # Ь и её родня: одна операция над скелетом даёт четыре буквы.
    bowl_top = 408  # верх нижней чаши у B этого шрифта
    soft_width = 832 - RSB - LSB
    letters[cyr('Ь')] = simple_glyph(glyf, soft_sign(LSB, bowl_top, soft_width), 832)
    letters[cyr('Б')] = simple_glyph(
        glyf,
        soft_sign(LSB, bowl_top, soft_width, top_bar=(LSB, LSB + soft_width - R_OUT)),
        832,
    )
    hard_ledge = 200
    letters[cyr('Ъ')] = simple_glyph(
        glyf,
        soft_sign(LSB + hard_ledge, bowl_top, soft_width,
                  top_bar=(LSB, LSB + hard_ledge + STROKE)),
        832 + hard_ledge,
    )
    yeru_gap = 120
    letters[cyr('Ы')] = simple_glyph(glyf, [
        *soft_sign(LSB, bowl_top, soft_width),
        orient(stem(LSB + soft_width + yeru_gap), True),
    ], LSB + soft_width + yeru_gap + STROKE + RSB)

    # Э — зеркальная С с перекладиной. Контуры копируются, а не подключаются
    # ссылкой: в TrueType глиф не может держать и контуры, и компоненты.
    c_shift = glyf['C'].xMin + glyf['C'].xMax
    letters[cyr('Э')] = simple_glyph(glyf, [
        *[orient(c, True) for c in copy_contours(glyf, 'C', scale_x=-1, dx=c_shift)],
        orient(bar(320, glyf['C'].xMax - STROKE + 10, MID, MID + STROKE), True),
    ], hmtx['C'][0])

    # Ю — стойка, овал и перекладина между ними.
    o_shift = LSB + STROKE + 92 - glyf['O'].xMin
    o_left = glyf['O'].xMin + o_shift
    letters[cyr('Ю')] = simple_glyph(glyf, [
        orient(stem(LSB), True),
        *[orient(c, i == 0) for i, c in enumerate(copy_contours(glyf, 'O', dx=o_shift))],
        orient(bar(LSB + STROKE, o_left + STROKE, MID, MID + STROKE), True),
    ], glyf['O'].xMax + o_shift + RSB)

    # Л — тот же скелет, что у П, но с наклонной левой ногой: иначе ЛОТ и ПОТ
    # различались бы только скруглением углов.
    letters[cyr('Л')] = simple_glyph(glyf, [orient(arch(58, 836 - RSB, slant=110), True)], 836)

    # Д — арка на подставке с двумя ножками под базовой линией. Наклон ноги здесь
    # не нужен: он отличает Л от П, а Д узнаётся по подставке.
    de_width, foot = 1000, 81
    de_right = de_width - RSB
    letters[cyr('Д')] = simple_glyph(glyf, [
        orient(arch(LSB + 93, de_right - 93, y0=STROKE), True),
        orient([
            (LSB, -TAIL, True), (LSB, STROKE, True), (de_right, STROKE, True),
            (de_right, -TAIL, True), (de_right - foot, -TAIL, True),
            (de_right - foot, 0, True), (LSB + foot, 0, True), (LSB + foot, -TAIL, True),
        ], True),
    ], de_width)

    # Ф — стойка во всю высоту и самостоятельная чаша: у O все штрихи по высоте
    # заглавных, поэтому ссылкой на неё вертикаль не выступала бы за овал.
    phi_width, phi_pad = 860, 100
    phi_center = phi_width / 2 - STROKE / 2
    bowl_y0, bowl_y1 = 110, CAP - 110
    letters[cyr('Ф')] = simple_glyph(glyf, [
        orient(stem(phi_center), True),
        orient([
            *corner((phi_pad, bowl_y1), (-1, 0), (0, -1), R_OUT),
            *corner((phi_pad, bowl_y0), (0, -1), (1, 0), R_OUT),
            *corner((phi_width - phi_pad, bowl_y0), (1, 0), (0, 1), R_OUT),
            *corner((phi_width - phi_pad, bowl_y1), (0, 1), (-1, 0), R_OUT),
        ], True),
        orient([
            *corner((phi_pad + STROKE, bowl_y1 - STROKE), (-1, 0), (0, -1), R_IN, ARC_IN),
            *corner((phi_pad + STROKE, bowl_y0 + STROKE), (0, -1), (1, 0), R_IN, ARC_IN),
            *corner((phi_width - phi_pad - STROKE, bowl_y0 + STROKE), (1, 0), (0, 1), R_IN, ARC_IN),
            *corner((phi_width - phi_pad - STROKE, bowl_y1 - STROKE), (0, 1), (-1, 0), R_IN, ARC_IN),
        ], False),
    ], phi_width)

    return letters


def build() -> None:
    font = instantiateVariableFont(TTFont(SRC), {'wght': WEIGHT}, inplace=True)
    glyf, hmtx = font['glyf'], font['hmtx']
    center = lambda name: (glyf[name].xMin + glyf[name].xMax) / 2

    new_glyphs: dict[str, tuple[Glyph, int]] = {}

    for char, base in CLONE.items():
        new_glyphs[cyr(char)] = (composite(component(base)), hmtx[base][0])

    for char, base in MIRROR.items():
        # После отражения буква занимает [-xMax, -xMin]; сдвиг возвращает её на место.
        shift = glyf[base].xMin + glyf[base].xMax
        new_glyphs[cyr(char)] = (
            composite(component(base, x=shift, transform=[[-1, 0], [0, 1]])),
            hmtx[base][0],
        )

    for char, base in STEMMED.items():
        offset = center(base) - center('I')
        new_glyphs[cyr(char)] = (
            composite(component(base), component('I', x=offset)), hmtx[base][0],
        )

    # Ё — это Е с умлаутом, то есть ровно конструкция готовой Edieresis.
    umlaut = next(c for c in glyf['Edieresis'].components if c.glyphName != 'E')
    new_glyphs[cyr('Ё')] = (
        composite(component('E'), component(umlaut.glyphName, umlaut.x, umlaut.y)),
        hmtx['E'][0],
    )

    # Й — та же И плюс краткая. Знак нарисован для строчных, поэтому опускается
    # к заглавной по тому же правилу, что и умлаут.
    new_glyphs[cyr('Й')] = (
        composite(
            component('N', x=glyf['N'].xMin + glyf['N'].xMax, transform=[[-1, 0], [0, 1]]),
            component('breve', x=center('N') - center('breve'),
                      y=CAP_ACCENT_RAISE + CAP - glyf['breve'].yMin),
        ),
        hmtx['N'][0],
    )

    new_glyphs.update(build_letters(glyf, hmtx))

    font.setGlyphOrder(font.getGlyphOrder() + list(new_glyphs))
    for name, (glyph, width) in new_glyphs.items():
        glyf.glyphs[name] = glyph
        glyph.recalcBounds(glyf)
        hmtx.metrics[name] = (round(width), glyph.xMin if glyph.numberOfContours else 0)

    # Строчные ведут на те же заглавные: шрифт применяется только к uppercase,
    # и так кириллица не разъедется на две гарнитуры внутри одного слова.
    alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'
    missing = [c for c in alphabet if cyr(c) not in new_glyphs]
    mapping = {}
    for char in alphabet:
        if cyr(char) in new_glyphs:
            mapping[ord(char)] = cyr(char)
            mapping[ord(char.lower())] = cyr(char)

    for table in font['cmap'].tables:
        if table.isUnicode():
            table.cmap.update(mapping)

    rename(font)
    DST.parent.mkdir(parents=True, exist_ok=True)
    font.save(DST)
    print(f'{DST}: {len(new_glyphs)} глифов, покрыто {len(alphabet) - len(missing)}'
          f' из {len(alphabet)} букв' + (f', нет: {"".join(missing)}' if missing else ''))


def rename(font: TTFont) -> None:
    style = 'Regular'
    for name_id, value in (
        (1, FAMILY), (2, style), (3, f'{FAMILY} {style} derived from Orbitron'),
        (4, f'{FAMILY} {style}'), (6, f'{FAMILY.replace(" ", "")}-{style}'),
        (16, FAMILY), (17, style),
    ):
        for record in list(font['name'].names):
            if record.nameID == name_id:
                font['name'].setName(value, name_id, record.platformID,
                                     record.platEncID, record.langID)


if __name__ == '__main__':
    build()
