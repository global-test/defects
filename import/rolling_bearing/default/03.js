import "service.js";
import "rolling_bearing/rolling_bearing.js";

function default_init() {
  // Функция инициализации

  // Задание имени дефекта
  set_name("Перекос наружного кольца");

  // Добавление колорбокса. первый параметр - цвет, второй - текст
  add_color(0xff004dff, "Fн");

  // Задаем цвета спектров
  ausp.set_color(0xffff0867);
  spen.set_color(0xffff0867);

  // Задаем кол-во наборов гармоник для спектров
  ausp.set_harms_series_count(2);
  spen.set_harms_series_count(2);

  ausp_hf.set_enabled(false);
  spen_hf.set_enabled(false);

  std_log_init();
}

function default_display(f) {
  // Функция отображения
  // Конфигурация портретов
  // Задаем параметры спектра.
  // 1 - частотный диапазон,
  // 2 - кол-во точек спектра,
  // 3 - кол-во усреднений,
  // 4 - сглаживание желтой линии

  ausp.set_options(f_outer(f) * 7, (f_outer(f) * 7) / (f / 4), 5, 25);
  spen.set_options(f_outer(f) * 7, (f_outer(f) * 7) / (f / 4), 5, 75);

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

  for (i = 1; i <= 5; i++) ausp.harms[0].add(i * f_outer(f), 1, 1, 0);
  for (i = 1; i <= 5; i++) spen.harms[0].add(i * f_outer(f), 1, 1, 0);

  for (i = 1; i <= 2; i++) ausp.harms[1].add(2 * i * f_outer(f), 1, 3, 0);
  for (i = 1; i <= 2; i++) spen.harms[1].add(2 * i * f_outer(f), 1, 3, 0);

  // for (i = 1; i <= 11; i++) {
  // добавление гармоник на автоспектр. первый параметр - частота, второй - вес, третий толщнина линии, четвертый - индек колорбокса, задающего цвет.
  //   ausp.harms[(i + 1) % 2].add(i * freq, 1, ((i + 1) % 2) * 2 + 1, 0);
  //   spen.harms[(i + 1) % 2].add(i * freq, 1, ((i + 1) % 2) * 2 + 1, 0); //
  // }

  std_log_display();
}

function default_diagnostic() {
  //функция диагностики

  // Инициализация переменных, содержащих результат диагностики
  var is_defect = false;
  var comment = "";

  // Получение кол-ва гармоник присутствующих на автоспектре.
  // 1 - индекс набора гармоник,
  // 2 - с какой гармоники ищем,
  // 3 - допустимое кол-во пропусщенных в ряду.
  var cnt_harms_ausp = ausp.get_cnt_harms(1, 1, 0);
  console.log("AUSP harms count: " + cnt_harms_ausp);

  var cnt_harms_spen = spen.get_cnt_harms(1, 1, 0);
  console.log("SPEN harms count: " + cnt_harms_spen);

  if (cnt_harms_ausp >= 1 && cnt_harms_spen >= 1) {
    // реализация логики подтверждения дефекта
    // true - дефект обнаружен
    // false - дефект не обнаружен
    is_defect = true;
  } else if (cnt_harms_ausp == 1 || cnt_harms_spen == 1) {
    is_defect = true;
    comment = "повторить измерение"; //добавлен комментарий
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
