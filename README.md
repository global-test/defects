# DEFECTS - подпроект GTLd

Предназначен для описания дефектов. Язык JavaScript. 

## Структура API

Файл описания дефекта ```*.js``` должен содержать три обязательных функции:
* ``init()`` выполняет инициализацию дефекта, в функции задаётся имя дефекта и настраивается color-box, функция вызывается в приложении GTLd при создании элемента отображения дефекта;
```
function init() {
  // Функция инициализации

  // Задание имени дефекта
  set_name("биение винта");

  // Добавлнение колорбокса. первый параметр - цвет, второй - текст
  add_color(0xff00ff00, "Fвнт");

  std_log_init();
}
```

* ``display()`` описывает принцип формирования вибрационного портрета дефекта, функция вызывается в приложении GTLd при каждом изменении частоты вращения;
```
function display() {
  // Конфигурация портретов
  // Задаем параметры спектра.
  // Первый параметр - частотный диапазон,
  // Второй - кол-во точек спектра,
  // Третий - кол-во усреднений,
  // Четвертый - сглаживание желтой линии
  ausp.set_options(1000, 1000, 5, 15);
  spen.set_options(1000, 1000, 5, 25);

  // Задаем частоту фильтра спектра огибающей
  var fc = 2000 * Math.sqrt(freq);
  spen.set_filter(fc, (fc * 2) / 3);

  // Добавление гармоник на автоспектр.
  // Первый параметр - частота, второй - вес,
  // Третий толщнина линии,
  // Четвертый - индек колорбокса, задающего цвет.
  for (i = 1; i <= 7; i++) ausp.harms[0].add(i * freq, 1, 1, 0);
  for (i = 1; i <= 9; i++) spen.harms[0].add(i * freq, 1, 1, 0);

  std_log_display();
}
```
* ``diagnostic()`` описывает принцип постановки диагноза, функция вызывается в приложении GTLd после окончания набора спектров (``ausp`` и ``spen``).
```
function diagnostic() {
  // Функция диагностики

  // Инициализация переменных, содержащих результат диагностики
  var is_defect = false;
  var comment = "";

  // Извлечение кол-ва гармоник присутствующих на автоспектре.
  // Параметр - допустимое кол-во пропущенных гармоник в ряду.
  var cnt_harms_ausp = ausp.get_cnt_harms(2);
  console.log("AUSP harms count: " + cnt_harms_ausp);

  // Извлечение кол-ва гармоник присутствующих на спектре огибающей.
  // Параметр - допустимое кол-во пропущенных гармоник в ряду.
  var cnt_harms_spen = spen.get_cnt_harms(2);
  console.log("SPEN harms count: " + cnt_harms_spen);

  if (
    cnt_harms_ausp >= 3 &&
    cnt_harms_ausp <= 7 &&
    cnt_harms_spen >= 3 &&
    cnt_harms_spen <= 9
  ) {
    // реализация логики подтверждения дефекта
    // true - дефект обнаружен
    // false - дефект не обнаружен
    is_defect = true;
  } else if (
    cnt_harms_ausp >= 1 &&
    cnt_harms_ausp <= 2 &&
    cnt_harms_spen >= 1 &&
    cnt_harms_spen <= 2
  ) {
    is_defect = true;

    // добавлен комментарий
    comment = "повторить измерение";
  }

  return_result(is_defect, comment);
  std_log_diagnostic(is_defect, comment);
}
```

1. [Директивы](#dir)
    + [import](#import) 
2. [Глобальные переменные](#global_variables)
    + [freq](#freq)
3. [Глобальные методы](#global_methods)
    + [get_parametr](#get_parametr)
    + [add_color](#add_color)
    + [set_name](#set_name)
    + [return_result](#return_result)
    + [console.log](#console.log)
4. [Глобальные объекты](#global_objects)
    * [signal](#signal) 
    * [ausp, ausp_hf, spen и spen_hf](#spectrs) 
        * [Общие методы спектральных объектов](#common_methods)
            + [set_harms_count](#set_harms_count)
            + [set_slopes_count](#set_slopes_count)
            + [set_humps_count](#set_humps_count)
            + [set_options](#set_options)
            + [set_filter](#set_filter)
        * [Общие дочерние массивы спектральных объектов](#common_arrays)
            + [set_options](#set_options)
            + [set_filter](#set_filter)
5. [Массив наборов гармоник спектальных объектов - harms](#harms_array)
    * [Методы настройки harms](#)
        + [add](#add)
        + [add_modulated](#add_modulated)
        + [set_declay](#set_declay)
    * [Методы извлечения данных из harms](#)
        + [get_cnt_harms](#get_cnt_harms)
        + [is_harms_declay](#is_harms_declay)
6. [Массив наборов наклонов спектальных объектов - slopes](#slopes_array)
    * [Методы настройки slopes](#)
        + [add_slope](#add_slope)
    * [Методы извлечения данных из slopes](#)
        + [get_slope](#get_slope)
7. [Массив наборов наклонов спектальных объектов - humps](#humps_array)
    * [Методы настройки humps](#)
        + [add_hump](#add_hump)
    * [Методы извлечения данных из humps](#)
        + [get_hump](#get_hump)

<hr><br><br>

# <a name="dir"></a> 1. Директивы
## <a name="import"></a>Директива ``import`` 
Применяется для подключения дополнительных JS файлов.
### Пример: ``import "service.js";``

<hr><br><br>

# <a name="global_variables"></a> 2. Глобальные переменные
Глобальные переменные доступны в любой части скрипта.

<br><br>
## <a name="freq"></a>Глобальная переменная ``freq``
Содержит значение частоты вращения, заданное в приложении GTLd для данной процедуры диагностики. Изменение переменной ``freq`` в GTLd приводит к вызову функции ``display()``.
Переменная ``freq`` применяется для расчета частотных линий портрета дефекта.

<hr><br><br>

# <a name="global_methods"></a> 3. Глобальные методы
Глобальные методы доступны в любой части скрипта.

<br><br>

## <a name="get_parametr"></a>Глобальный метод ``get_parametr(PARAMETR_NAME)``
Может применяться во всех функциях скрипта. Предназначена для получения значения параметра из элемента ``r_elemet`` (из конфигурации объекта). Параметр ``PARAMETR_NAME`` - строковая переменная.
### Пример: ``var d_inner = get_parameter("internalD");``

<hr><br><br>

## <a name="add_color"></a>Глобальный метод ``add_color(COLOR, LABEL)`` 
Применяется в функции ``init``. Предназначена для добавления колор-бокса. Параметр``COLOR`` - цвет, ``LABEL`` - обозначение колор-бокса в приложении GTLd.
### Пример: ``add_color(0xff00ff00, "Fвр");``

<hr><br><br>

## <a name="set_name"></a>Глобальный метод ``set_name(NAME)``
Применяется в функции ``init`` для установки имени дефекта, данное имя идентифицирует дефект в приложении GTLd. Параметр ``NAME`` - строковая переменная.
### Пример: ``set_name("перекос вала");``

<hr><br><br>

## <a name="return_result"></a>Глобальный метод ``return_result(IS_DEFECT, COMMENT)``
Применяется в функции ``diagnoctic()`` для передачи в приложение GTLd результаты диагностики, должна быть вызвана после формирования диагноза, в данную функцию передаётся результат диагностики в виде параметров:
``IS_DEFECT`` логическая переменная, передается ``true`` или ``false`` в зависимости от того, обнаружен или нет дефект, ``COMMENT`` строковая переменная, предназначена для передачи комментария.
### Пример: ``return_result(true, "дефект ярко выражен");``

<hr><br><br>

## <a name="console.log"></a>Глобальный метод ``console.log(TEXT)``
Может применяться во всех функциях скрипта. Предназначена записи отладочной информации в лог-файл. ``TEXT`` - строковая переменная.
### Пример: ``console.log("Завершена инициализация");``

<hr><br><br>

# <a name="global_objects"></a>4. Глобальные объекты
Глобальные объекты доступны в любой части скрипта.

<br><br>

## <a name="signal"></a>Глобальный объект ``signal``
Этот объект предназначен для получения данных об исследуемом сигнале из приложения GTLd. Поддерживает следующие методы:
* ``.get_name()`` - возвращает имя исследуемого сигнала; 
* ``.is_magnetic()`` - возвращает логическую переменную, означающую что датчик закреплён на магните (``true``) или нет (``false``);

<hr><br><br>

## <a name="spectrs"></a>Глобальные объекты ``ausp``, ``ausp_hf``, ``spen`` и ``spen_hf``
Объекты спектров ``ausp``, ``ausp_hf``, ``spen`` и ``spen_hf`` (далее - спектральные объекты) предназначены для взаимодействия со спектрами обрабатываемого сигнала: 
* ``ausp`` - автоспектр; 
* ``ausp_hf`` - автоспектр выскокочастотный; 
* ``spen`` - спектр огибающей;
* ``spen_hf`` - спектр огибающей высокочастотный.

Спектральные объекты являются глобальными и доступны в любой функции скрипта и содержат одинаковые наборы методов и дочерних объектов.

<hr><br><br>

## <a name="common_methods"></a>Общие методы спектральных объектов
<br><br>

## <a name="set_harms_count"></a>Метод ``set_harms_count(COUNT)``
Устанавливает количество наборов гармоник, исследуемых в рамках данного дефекта. Параметром ``COUNT`` в метод передаётся количество наборов гармоник, которое планируется использовать.  По умолчанию используется один набор гармоник. Его индекс - 0. Если не планируется использование более одного набора гармоник, то данную функцию вызывать не требуется. Метод используется в функции ``display()``.
### Пример: ``ausp.set_harms_count(2);`` // пример для автоспектра, если планируется использовать 2 набора гармоник

<hr><br><br>

### <a name="set_slopes_count"></a>Метод ``set_slopes_count(COUNT)``
Устанавливает количество наборов наклонов спектров, исследуемых в рамках данного дефекта. Параметром ``COUNT`` в метод передаётся количество наборов наклонов спектра, которое планируется использовать.  По умолчанию используется один набор наклонов. Его индекс - 0. Если не планируется использование более одного набора наклонов, то данную функцию вызывать не требуется. Метод используется в функции ``display()``.
### Пример: ``ausp.set_options(1000, 1000, 5, 15);`` // пример для автоспектра

<hr><br><br>

### <a name="set_humps_count"></a>Метод ``set_humps_count(COUNT)``
Устанавливает количество наборов горбов спектров, исследуемых в рамках данного дефекта. Параметром ``COUNT`` в метод передаётся количество наборов горбов спектра, которое планируется использовать.  По умолчанию используется один набор горбов. Его индекс - 0. Если не планируется использование более одного набора горбов, то данную функцию вызывать не требуется. Метод используется в функции ``display()``.
### Пример: ``ausp.set_options(1000, 1000, 5, 15);`` // пример для автоспектра

<hr><br><br>

* <a name="set_options"></a> ``.set_options(FREQ_BEGIN, FREQ_END, DELTA)`` - установка частотных настроек спектра, ``FREQ_RANGE`` - частотный диапазон, ``POINT_COUNT`` - количество точек спектра, ``S1`` - количество устреднений, ``S2`` - количество сглаживаний средней линии; 
### Пример: ``ausp.set_options(1000, 1000, 5, 15);`` // пример для автоспектра

<hr><br><br>

* <a name="set_filter"></a>``.set_filter(FREQ, WIDTH)`` - настройка полосового фильтра для спектра. Параметр ``FREQ`` - частота,  ``WIDTH`` - ширина полосы;
### Пример: ``spen.set_filter(fc, (fc * 2) / 3);`` // пример для спектра огибающей

<hr><br><br>

## <a name="child_objects"></a>Общие дочерние массивы спектральных объектов
* ``harms[]`` - массив объектов для работы с наборами гармоник;
* ``slopes[]`` - массив объектов для работы с наборами наклонов;
* ``humps[]`` - массив объектов для работы с наборами горбов.

<hr><br><br>

# <a name="harms_array"></a>5. Массив наборов гармоник спектральных объектов ``harms[]``

Каждый элемент массива ``harms[]`` представляет собой объект для работы с набором гармоник, в ходе анализа возможна настройка произвольного количества наборов гармоник, используемого в объекте спектра. Доступ к набору гармоник осуществляется следующим образом: ``ausp.harms[N]``, где N - индекс набора гармоник. 

<hr><br><br>

## <a name="hamrs_methods"></a> Методы настройки ``harms[]``
<br><br>

## <a name="harms_add"></a>Метод добавления гармоники в набор ``harms[N].add(FREQ, WIDTH, COLOR_INDEX)``
Предназначен для добавления гармоник вибрационного портрета в заданный набор. Параметр ``N`` задаёт индекс набора гармоник. Первый параметр ``FREQ`` - частота, второй `WIDTH` - толщнина линии, третий - индекс колор-бокса, задающего цвет; 
### Пример: ``ausp.harms[0].add(i*freq, 1, 0);`` // пример для автоспектра

<hr><br><br>

## <a name="harms_add_modulated"></a>``harms[N].add_modulated(FREQ, M_FREQ, COUNT, WIDTH, COLOR_INDEX, M_WIDTH, M_COLOR_INDEX)``	
Предназначен для добавления гармоник модулированных другой частотой на спектр.  Параметр ``N`` задаёт индекс набора гармоник. Параметр ``FREQ`` - несущая частота, ``M_FREQ`` - модулирующая частота, ``COUNT`` - количество модуляций, ``WIDTH`` - ширина линии несущей гармоники, ``COLOR_INDEX`` - индекс цвета линии несущей гармоники, ``M_WIDTH`` - ширина линии модулирующих гармоник, ``M_COLOR_INDEX`` - индекс цвета линий модулирующих гармоник;
### Пример: ``spen.harms[0].add_modulated(i * f_nut, freq, 1, 3, 0, 1, 0);`` // пример для спектра огибающей

<hr><br><br>

* <a name="set_declay"></a>``.set_declay(K)`` - установка параметров затухания, где ``K`` - вещественное число. Если для для гармоник, содержащихся в этом дефекте необходимо учитывать затухание, то его значение задается параметром ``K``. Значение параметра - коэффициент наклона линии, проведенной из первой гармоники. Если все гармоники находятся под этой линией, то считается что затухание присутствует;
### Пример: ``spen.harms[0].set_declay(-0.05);`` // пример для спектра огибающей
<br><br>

<hr>

## <a name="harms"></a>Массив объектов ``slopes[]``

Каждый элемент массива ``slopes[]`` представляет собой объект для работы с набором гармоник, в ходе анализа возможна настройка произвольного количества наборов гармоник в с объекте спектра. Доступ к набору гармоник осуществляется следующим обюразом: ``ausp.harms[N]``, где N - индекс набора гармоник. 

### Методы настройки наборов гармоник:


* <a name="add_slope"></a>``.add_slope(FREQ_BEGIN, FREQ_END, COLOR_INDEX)`` - передача параметров поиска наклона спектра. Параметры ``FREQ_BEGIN`` и  ``FREQ_END`` - начало и конец частотного диапазона, ``COLOR_INDEX`` - индекс цвета;
### Пример: ``spen.add_slope(0, freq / 2, 0);`` // пример для спектра огибающей
<br><br>
* <a name="add_hump"></a>``.add_hump(FREQ_BEGIN, FREQ_END, COLOR_INDEX)`` - передача параметров поиска горбов спектра. Параметры ``FREQ_BEGIN`` и  ``FREQ_END`` - начало и конец частотного диапазона, ``COLOR_INDEX`` - индекс цвета;
### Пример: ``spen.add_hump(5000, 10000, 0);`` // пример для спектра огибающей
<br><br>

<hr>

### Методы извлечения результатов анализа спектров ``ausp``, ``ausp_hf``, ``spen`` и ``spen_hf`` (методы группы №2):
<br><br>
* <a name="get_cnt_harms"></a>``.get_cnt_harms(N)`` - возвращает количество гармоник, присутствующих на спектре. Параметр ``N`` - допустимое количество пропущенных гармоник в ряду;
### Пример: ``var cnt_harms_ausp = ausp.get_cnt_harms(2);`` 
<br><br>
* <a name="is_harms_declay"></a>``.is_harms_declay()``- возвращает логическую переменную, которая может принимать значения ``true`` или ``false``, что означает обнаружено или нет затухание гармоник;
### Пример: ``var is_harms_ausp_declay = ausp.is_harms_declay();``
<br><br>
* <a name="get_slope"></a>``.get_slope(N)`` - возвращает логическую переменную, которая может принимать значения ``true`` или ``false``, что означает обнаружен или нет наклон. Параметр ``N`` - 
индекс запрашиваемого диапазона.
### Пример: ``var slope_ausp = ausp.get_slope(0);``
<br><br>
* <a name="get_hump"></a>``.get_hump(N)`` - возвращает логическую переменную, которая может принимать значения ``true`` или ``false``, что означает обнаружен или нет горб на спектре. Параметр ``N`` - 
индекс запрашиваемого диапазона.
### Пример: ``var hump_ausp = ausp.get_hump(0);``
