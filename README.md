# DEFECTS - подпроект GTLd

Предназначен для описания дефектов.

## Документация API
Язык JavaScript

### Структура API

Файл описания дефекта ```*.js``` должен содержать три обязательных функции:
* ``init()`` выполняет инициализацию дефекта, в функции задаётся имя дефекта и настраивается color-box, вызывается при старте приложения
* ``display()`` описывает принцип формирования портрета дефекта, вызывается при изменении частоты вращения
* ``diagnostic()`` описывает принцип постановки диагноза, пока не понял когда вызывается

<hr>

### Глобальная функция ``get_parametr(PARAMETR_NAME)``

Применяется для получения параметра из элемента r_elemet. ``PARAMETR_NAME`` - строковая переменная

#### Пример использования:
``var d_inner = get_parameter("internalD");``

### Глобальная функция ``add_color(COLOR, LABEL)`` 
Предназначена для добавление колорбокса, ``COLOR`` - цвет, ``LABEL`` - обозначение

#### Пример использования:
``add_color(0xff00ff00, "Fвр");``
<hr>

### 1) Глобальный объект ``harms_ausp``
Предназначен для настройки отображения вибрационного портрета на автоспектре

#### Методы глобального объекта ``harms_ausp``:
* ``harms_ausp.decay``
* ``humps_ausp.add(5000, 10000, 0);`` задаем диапазоны поиска горбов, первые два параметра - частотный диапазон, третие - индекс цвета в color-box

### 2) Глобальный объект ``harms_spen``
Предназначен для настройки отображения вибрационного портрета на спектре огибающей

#### Методы глобального объекта ``harms_spen``:
* ``harms_spen.decay`` (на самом деле свойство)
* ``harms_spen.add(i*freq, 1, 0);`` добавление гармоник на спектр огибающей. harms_spen - список отображаемых на спектре огибающей гармоник.
* ``harms_spen.add_modulated(i * f_nut, freq, 1, 3, 0, 1, 0);``	добавление гармоник на спектр огибающей. harms_spen - список отображаемых на спектре огибающей гармоник.

### 3) Глобальный объект ``slopes_ausp``
Предназначен для настройки шаблона наклона автоспектра

#### Методы глобального объекта ``slopes_ausp``:
* ``slopes_ausp.add(0, freq / 2, 0);`` задаем наклон. первые два параметра - частотный диапазон, третий - индекс цвета

### 4) Глобальный объект ``slopes_spen``
Предназначен для настройки шаблона наклона спектра огибающей

#### Методы глобального объекта ``slopes_spen``:
* ``slopes_ausp.spen(0, freq / 2, 0);`` задаем наклон. первые два параметра - частотный диапазон, третий - индекс цвета

### 5) Глобальный объект ``humps_ausp``
Предназначен для настройки отображения вибрационного портрета на автоспектре

#### Методы глобального объекта ``humps_ausp``:
* ``humps_ausp.add(5000, 10000, 0);`` задаем диапазоны поиска горбов. первые два параметра - частотный диапазон, третие - индекс цвета

### 6) Глобальный объект ``humps_spen``
Предназначен для настройки отображения вибрационного портрета на спектре огибающей

#### Методы глобального объекта ``humps_spen``:
* ``humps_spen.add(5000, 10000, 0);`` задаем диапазоны поиска горбов. первые два параметра - частотный диапазон, третие - индекс цвета

### 7) Глобальный объект ``ausp``
Предназначен для получения результата из графика автоспектра

#### Методы глобального объекта ``ausp``
* ``ausp.get_cnt_harms(N);`` получение кол-ва гармоник присутствующих на автоспектре. N - допустимое кол-во пропущенных в ряду
* ``ausp.is_harms_decay();`` затухают ли гармоники
* ``ausp.get_slope(N);`` получение наклона. N - индекс диапазона 

### 8) Глобальный объект ``spen``
Предназначен для получения результатов из графика спектра огибающей

#### Методы глобального объекта ``spen``
* ``spen.get_cnt_harms(N);`` получение кол-ва гармоник присутствующих на спектре огибающей. N - допустимое кол-во пропущенных в ряду
* ``spen.is_harms_decay();`` затухают ли гармоники
* ``spen.get_slope(N);`` получение наклона. N - индекс диапазона

<hr>

### Глобальные переменные

* ``name`` cтроковая переменная, используется в функции ``init()`` для указания наименования дефекта
* ``is_defect`` логическая переменная, используется в функции ``diagnoctic()``, возвращает ``true`` или ``false`` в зависимости от того, обнаружен или нет дефект
* ``comment`` строковая переменная, используется в функции ``diagnoctic()``, возвращает комментарий, например:  ``Перемерить``



