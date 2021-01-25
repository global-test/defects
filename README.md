# DEFECTS - подпроект GTLd

Предназначен для описания дефектов.

## Документация API
Язык JavaScript

### Структура API

Файл описания дефекта ```*.js``` должен содержать три обязательных функции:
* ``init()`` выполняет инициализацию дефекта, в функции задаётся имя дефекта и настраивается colorbox
* ``display()`` описывает принцип формирования портрета дефекта
* ``diagnostic()`` описывает принцип постановки диагноза

<hr>

### Глобальные функции

* ``get_parametr(PARAMETR_NAME)`` применяется для получения параметра из элемента r_elemet. ``PARAMETR_NAME`` - строковая переменная

#### Пример использования:
``var d_inner = get_parameter("internalD");``

* ``add_color(COLOR, LABEL)`` добавлнение колорбокса, ``COLOR`` - цвет, ``LABEL`` - обозначение

#### Пример использования:
``add_color(0xff00ff00, "Fвр");``
<hr>

### Глобальные объекты
* ``harms_ausp``
#### Методы глобального объекта ``harms_ausp``

* ``harms_spen``
#### Методы глобального объекта ``harms_spen``

* ``slopes_ausp``
#### Методы глобального объекта ``slopes_ausp``
* ``slopes_ausp.add(0, freq / 2, 0);``
``slopes_ausp.add(0, freq / 2, 0);`` задаем наклон. первые два параметра - частотный диапазон, третий - индекс цвета

* ``slopes_spen``
#### Методы глобального объекта ``slopes_spen``
``slopes_ausp.spen(0, freq / 2, 0);`` задаем наклон. первые два параметра - частотный диапазон, третий - индекс цвета

* ``ausp``
#### Методы глобального объекта ``ausp``
``ausp.get_cnt_harms(N);`` получение кол-ва гармоник присутствующих на автоспектре. N - допустимое кол-во пропущенных в ряду
``ausp.get_slope(N);`` получение наклона. N - индекс диапазона 

* ``spen``
#### Методы глобального объекта ``spen``
``spen.get_cnt_harms(N);`` получение кол-ва гармоник присутствующих на спектре огибающей. N - допустимое кол-во пропущенных в ряду
``spen.is_harms_decay();`` есть затухание?
``spen.get_slope(N);`` получение наклона. N - индекс диапазона

<hr>

### Глобальные переменные

* ``name`` cтроковая переменная, используется в функции ``init()`` для указания наименования дефекта
* ``is_defect`` логическая переменная, используется в функции ``diagnoctic()``, возвращает ``true`` или ``false`` в зависимости от того, обнаружен или нет дефект
* ``comment`` строковая переменная, используется в функции ``diagnoctic()``, возвращает комментарий, например:  ``Перемерить``



