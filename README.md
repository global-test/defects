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

### Встроенные функции

* ``get_parametr(PARAMETR_NAME)`` применяется для получения параметра из элемента r_elemet.

#### Входной параметр:
``PARAMETR_NAME`` - строковая переменная

#### Пример использования:
``var d_inner = get_parameter("internalD");``

* ``add_color(COLOR, NAME)``
<hr>

### Встроенные объекты
* ``harms_ausp``
* ``harms_spen``
<hr>

### Встроенные переменные

* ``name`` cтроковая переменная, используется в функции ``init()`` для указания наименования дефекта
* ``is_defect`` логическая переменная, используется в функции ``diagnoctic()``, возвращает ``true`` или ``false`` в зависимости от того, обнаружен или нет дефект
* ``comment`` строковая переменная, используется в функции ``diagnoctic()``, возвращает комментарий, например:  ``Перемерить``



