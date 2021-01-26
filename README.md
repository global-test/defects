# DEFECTS - подпроект GTLd

Предназначен для описания дефектов.

## Документация API
Язык JavaScript

## Структура API

Файл описания дефекта ```*.js``` должен содержать три обязательных функции:
* ``init()`` выполняет инициализацию дефекта, в функции задаётся имя дефекта и настраивается color-box, вызывается при создании элемента отображения дефекта приложения
* ``display()`` описывает принцип формирования портрета дефекта, вызывается при изменении частоты вращения
* ``diagnostic()`` описывает принцип постановки диагноза, вызывается по окончании набора спектров.

<hr>

## Глобальная функция ``get_parametr(PARAMETR_NAME)``
Может применяться во всех функциях скрипта. Предназначена для получения параметра из элемента ``r_elemet`` (из конфигурации объекта). Параметр ``PARAMETR_NAME`` - строковая переменная
### Пример: ``var d_inner = get_parameter("internalD");``

## Глобальная функция ``add_color(COLOR, LABEL)`` 
Применяется в функции ``init``. Предназначена для добавления колор-бокса, применяется в функции ``init``. Параметр``COLOR`` - цвет, ``LABEL`` - обозначение
### Пример: ``add_color(0xff00ff00, "Fвр");``

## Глобальная функция ``set_name(NAME)``
Применяется в функции ``init`` для установки имени дефекта, данное имя идентифицирует дефект в GTLd. Параметр ``NAME`` - строковая переменная
### Пример: ``set_name("перекос вала");``

## Глобальная функция ``return_result(IS_DEFECT, COMMENT)``
Применяется в функции ``diagnoctic()``, должна быть вызвана после формирования диагноза, в данную функцию передаётся результат диагностики в виде параметров:
``IS_DEFECT`` логическая переменная, передается ``true`` или ``false`` в зависимости от того, обнаружен или нет дефект, ``COMMENT`` строковая переменная, предназначена для передачи комментария.
### Пример: ``return_result(false, "дефект не обнаружен");``

<hr>

## Глобальный объекты ``ausp`` и ``spen``
Эти объекты предназначены для взаимодействия со спектрами обрабатываемого сигнала, 
* ``ausp`` - автоспектр; 
* ``spen`` - спект огибающей.
Ниже представлены методы настройки спектров и методы извлечения результатов анализа спектров. 
Методы для обоих глобальных объектов одинаковые.

## Методы настройки спектров:

* ``.add(FREQ, WIDTH, COLOR_INDEX)`` - добавление гармоник вибрационного портрета на спектр. Первый параметр ``FREQ`` - частота (вещественное число), второй `WIDTH` - толщнина линии (натуральное число), третий - индекс колор-бокса, задающего цвет (натуральное число); 
### Пример: ``ausp.add(i*freq, 1, 0);`` // пример для автоспектра

* ``.add_modulated(FREQ, M_FREQ, COUNT, WIDTH, COLOR_INDEX, M_WIDTH, M_COLOR_INDEX)``	добавление гармоник модулированных другой частотой на спектр. Параметр ``FREQ`` - несущая частота, ``M_FREQ`` - модулирующая частота, ``COUNT`` - количество модуляций, ``WIDTH`` - ширина линии несущей гармоники, ``COLOR_INDEX`` - индекс цвета линии несущей гармоники, ``M_WIDTH`` - ширина линии модулирующих гармоник, ``M_COLOR_INDEX`` - индекс цвета линий модулирующих гармоник;
### Пример: ``spen.add_modulated(i * f_nut, freq, 1, 3, 0, 1, 0);`` // пример для спектра огибающей

* ``.set_declay(K)`` - установка параметров затухания, где ``K`` - вещественное число. Если для для гармоник, содержащихся в этом дефекте необходимо учитывать затухание, то его значение задается параметром ``K``. Значение параметра - коэффициент наклона линии, проведенной из первой гармоники. Если все гармоники находятся под этой линией, то считается что затухание присутствует;
### Пример: ``spen.set_declay(-0.05);`` // пример для спектра огибающей

* ``.add_slope(FREQ_BEGIN, FREQ_END, COLOR_INDEX)`` - передача параметров поиска наклона спектра. Параметры ``FREQ_BEGIN`` и  ``FREQ_END`` - начало и конец частотного диапазона, ``COLOR_INDEX`` - индекс цвета;
### Пример: ``spen.add_slope(0, freq / 2, 0);`` // пример для спектра огибающей

* ``.add_hump(FREQ_BEGIN, FREQ_END, COLOR_INDEX)`` - передача параметров поиска горбов спектра. Параметры ``FREQ_BEGIN`` и  ``FREQ_END`` - начало и конец частотного диапазона, ``COLOR_INDEX`` - индекс цвета;
### Пример: ``spen.add_hump(5000, 10000, 0);`` // пример для спектра огибающей

# ПЛЮС нужно придумать методы настройки самих спектров, они даже должны самыми первыми идти

<hr>

## Методы извлечения результатов анализа спектров:

* ``.get_cnt_harms(N);`` получение кол-ва гармоник присутствующих на автоспектре. N - допустимое кол-во пропущенных в ряду
* ``.is_harms_decay();`` возвращает логическую переменную, котороая может принимать значения ``true`` или ``false``, что обозначает обнаружено или нет затухание гармоник;
* ``.get_slope(N);`` получение наклона. N - индекс диапазона 





<hr>






# DEFECTS - подпроект GTLd (старая версия)

Предназначен для описания дефектов.

## Документация API
Язык JavaScript

### Структура API

Файл описания дефекта ```*.js``` должен содержать три обязательных функции:
* ``init()`` выполняет инициализацию дефекта, в функции задаётся имя дефекта и настраивается color-box, вызывается при создании элемента отображения дефекта приложения
* ``display()`` описывает принцип формирования портрета дефекта, вызывается при изменении частоты вращения
* ``diagnostic()`` описывает принцип постановки диагноза, вызывается по окончании набора спектров.

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
на самом деле ``harms_ausp`` и ``harms_spen`` объект одного и того же типа, поэтому можно описать методыи свойства для одного из них.

Предназначен для хранения отображаемых гармоник на автоспектре. Тут надо немного пояснить. Так как у нас спектры относятся к объектам, то приходится хранить все примитивы (гармоники, наклоны, горбы и т.д) в объекте дефекта. конкретно этот объект - контейнер для хранения гармоник. При отрисовке спектра происходит опрос всех дефектов не предмет что для них нужно отобразить для них, те передают им содержимое этого и подобных контейнеров и производится отображение примитивов.

#### Методы глобального объекта ``harms_ausp``:
* ``harms_ausp.decay`` //если для для гармоник, содержащихся в этом контейнере необходимо учитывать затухание, то его значение задается этим свойством. значение - коэффициент наклона линии, проведенной из первой гармоники. если все гармоники находтся под этой линией, то считается что затухание присутствует.
* ``harms_ausp.add(i * f_nut, width, 0);`` //добавление гармоник на автоспектр. первый параметр - частота, второй толщнина линии, третий - индек колорбокса, задающего цвет. harms_ausp - список отображаемых на автоспектре гармоник. freq - частота вращения.

### 2) Глобальный объект ``harms_spen``
Предназначен для настройки отображения вибрационного портрета на спектре огибающей

#### Методы глобального объекта ``harms_spen``:
* ``harms_spen.decay`` (на самом деле свойство)
* ``harms_spen.add(i*freq, 1, 0);`` добавление гармоник на спектр огибающей. harms_spen - список отображаемых на спектре огибающей гармоник.
* ``harms_spen.add_modulated(i * f_nut, freq, 1, 3, 0, 1, 0);``	добавление гармоник модулированных другой частотой на спектр огибающей. harms_spen - список отображаемых на спектре огибающей гармоник. 1 параметр - несущая частота, второй - модулирующая, 3 -колво модуляций, 4- ширина линии несущей гармоники, 5 - индекс цвета линии несущей гармоники, 6- ширина линии модулирующих гармоник, 7 - индекс цвета линий модулирующих гармоник.

### 3) Глобальный объект ``slopes_ausp``
Предназначен для настройки шаблона наклона автоспектра

#### Методы глобального объекта ``slopes_ausp``:
* ``slopes_ausp.add(0, freq / 2, 0);`` задаем наклон. первые два параметра - частотный диапазон, третий - индекс цвета

### 4) Глобальный объект ``slopes_spen``
контейнер примитивов "наклон".

#### Методы глобального объекта ``slopes_spen``:
* ``slopes_ausp.spen(0, freq / 2, 0);`` задаем наклон. первые два параметра - частотный диапазон, третий - индекс цвета

### 5) Глобальный объект ``humps_ausp``
контейнер примитивов "горбы".

#### Методы глобального объекта ``humps_ausp``:
* ``humps_ausp.add(5000, 10000, 0);`` задаем диапазоны поиска горбов. первые два параметра - частотный диапазон, третие - индекс цвета

### 6) Глобальный объект ``humps_spen``
Предназначен для настройки отображения вибрационного портрета на спектре огибающей

#### Методы глобального объекта ``humps_spen``:
* ``humps_spen.add(5000, 10000, 0);`` задаем диапазоны поиска горбов. первые два параметра - частотный диапазон, третие - индекс цвета

### 7) Глобальный объект ``ausp``
объект содержащий автоспектр

#### Методы глобального объекта ``ausp``
* ``ausp.harms;`` -свойство, предоставляющее доступ к контейнеру гармоник, добавленных на спектр для анализа. Как говорилось выше, спектр относится к объекту, а гармоники к дефектам. поэтому при проведении анализа по каждому дефекту предварительно в объект спектра ``ausp`` загружается гармоники анализируемого дефекта (это касается и других примитивов). Эти загруженные гармоники можно путем вызова соответсвующих методов ``ausp.harms;`` (аталогичных ``harms_ausp``, т.к. тип один и  тот же) модифицировать. Это нужно делать потому, что для некоторых дефектов (на самом деле для многих) отображаемые гармоники и гармоники, участвующие в анализе, отличаются (мне лично не понятно зачем отображать то, что не участвует в анализе). Это несколько усложняет понимание, имхо.


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

# ВЕРСИЯ 2



