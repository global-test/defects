import "service.js";
import "gear_transmission.js";

function init() {
  // Функция инициализации

  // Задание имени дефекта
  set_name("Биение ведомой шестерни");

  // Добавление колорбокса. первый параметр - цвет, второй - текст
  //add_color(0xffff00ff, "Fвр1");
  add_color(0xff0000ff, "Fвр2");
  add_color(0xff00fffb, "Fz±Fвр2");

  // Задаем цвета спектров
  ausp.set_color(0xfffbff00);
  spen.set_color(0xfffbff00);

  // Задаем кол-во наборов гармоник для спектров
  ausp.set_harms_series_count(2);
  spen.set_harms_series_count(2);

  ausp_hf.set_enabled(false);
  spen_hf.set_enabled(false);

  std_log_init();
}

function display() {
  f = freq;
  // Функция отображения
  // Конфигурация портретов
  // Задаем параметры спектра.
  // 1 - частотный диапазон,
  // 2 - кол-во точек спектра,
  // 3 - кол-во усреднений,
  // 4 - сглаживание желтой линии

  ausp.set_options(fz(f) * 4, (fz(f) * 4) / (f2(f) / 8), 5, 25);
  spen.set_options(fz(f) * 4, (fz(f) * 4) / (f2(f) / 8), 5, 75);

  // Задаем частоту фильра спектра огибающей
  var fc = 2000 * math.sqrt(f);
  spen.set_filter(fc, (fc * 2) / 3);

  // Добавление гармоник на автоспектр.
  // 1 - частота,
  // 2 - вес,
  // 3 - толщина линии,
  // 4 - индек колорбокса, задающего цвет,
  // freq - частота вращения,
  // [индек] - индекс массива набора гармоник.

  for (i = 1; i <= 7; i++) ausp.harms[0].add((i * f2(f)) / 2, 1, 1, 0);
  for (i = 1; i <= 9; i++) spen.harms[0].add((i * f2(f)) / 2, 1, 1, 0);

  // Добавление гармоник на спектр огибающей. harms_spen - список отображаемых на спектре огибающей гармоник.
  // 1 - несущая частота
  // 2 - вес
  // 3 - модулирующая
  // 4 - вес модулирующей
  // 5 - количество модуляций
  // 6 - ширина линии несущей
  // 7 - индекс цвета несущей
  // 8 - ширина модулирующей
  // 9 - индекс цвета модулирущей
  for (i = 1; i <= 3; i++)
    ausp.harms[1].add_modulated(i * fz(f), 1, f2(f), 1, 2, 3, 1, 1, 0);

  for (i = 1; i <= 3; i++)
    spen.harms[1].add_modulated(i * fz(f), 1, f2(f), 1, 2, 3, 1, 1, 0);

  std_log_display();
}

function diagnostic() {
  //функция диагностики

  // Инициализация переменных, содержащих результат диагностики
  var is_defect = false;
  var comment = "";

  // Получение кол-ва гармоник присутствующих на автоспектре.
  // 1 - индекс набора гармоник,
  // 2 - с какой гармоники ищем,
  // 3 - допустимое кол-во пропусщенных в ряду.
  var cnt_harms_ausp_0 = ausp.get_cnt_harms(0, 2, 2);
  console.log("AUSP harms count (fвр2): " + cnt_harms_ausp_0);

  var cnt_harms_spen_0 = spen.get_cnt_harms(0, 2, 2);
  console.log("SPEN harms count (fвр2): " + cnt_harms_spen_0);

  var cnt_harms_ausp_1 = ausp.get_cnt_harms(1, 1, 1);
  console.log("AUSP harms count (fz): " + cnt_harms_ausp_1);

  var cnt_harms_spen_1 = spen.get_cnt_harms(1, 1, 1);
  console.log("SPEN harms count (fz): " + cnt_harms_spen_1);

  if (
    cnt_harms_ausp_0 >= 3 &&
    cnt_harms_ausp_0 <= 7 &&
    cnt_harms_ausp_1 >= 1 &&
    cnt_harms_spen_0 >= 3 &&
    cnt_harms_spen_0 <= 9 &&
    cnt_harms_spen_1 >= 1
  ) {
    // реализация логики подтверждения дефекта
    // true - дефект обнаружен
    // false - дефект не обнаружен
    is_defect = true;
  } else if (
    cnt_harms_ausp_0 >= 1 &&
    cnt_harms_ausp_0 <= 2 &&
    cnt_harms_spen_0 >= 1 &&
    cnt_harms_spen_0 <= 2 &&
    cnt_harms_spen_1 == 1
  ) {
    is_defect = true;
    comment = "повторить измерение"; //добавлен комментарий
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
