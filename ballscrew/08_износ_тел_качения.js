import "service.js";
import "ballscrew.js";

function init() {
  // Функция инициализации

  // Задание имени дефекта
  set_name("Износ тел качения");

  // Добавление колорбокса. первый параметр - цвет, второй - текст
  add_color(0xff00ff55, "Fcage");
  add_color(0xff8800ff, "Fврв-Fcage");

  // Задаем цвета спектров
  ausp.set_color(0xffff9900);
  spen.set_color(0xffff9900);

  ausp_hf.set_color(0xffff9900);
  spen_hf.set_color(0xffff9900);

  // Задаем кол-во наборов гармоник для спектров
  ausp.set_harms_series_count(2);
  spen.set_harms_series_count(2);

  ausp_hf.set_humps_count(1);
  spen_hf.set_humps_count(1);

  std_log_init();
}

function display() {
  // Функция отображения
  // Конфигурация портретов
  // Задаем параметры спектра.
  // 1 - частотный диапазон,
  // 2 - кол-во точек спектра,
  // 3 - кол-во усреднений,
  // 4 - сглаживание желтой линии

  ausp.set_options(freq * 20, (freq * 20) / (f_cage / 8), 5, 25);
  spen.set_options(freq * 20, (freq * 20) / (f_cage / 8), 5, 75);

  ausp_hf.set_options(10000, 1000, 5, 25);
  spen_hf.set_options(10000, 1000, 5, 75);

  // Задаем частоту фильра спектра огибающей
  var fc = 2000 * math.sqrt(freq);
  spen.set_filter(fc, (fc * 2) / 3);

  // Добавление гармоник на автоспектр.
  // 1 - частота,
  // 2 - вес,
  // 3 - толщина линии,
  // 4 - индек колорбокса, задающего цвет,
  // freq - частота вращения,
  // [индек] - индекс массива набора гармоник.

  for (i = 1; i <= 8; i++) ausp.harms[0].add(i * f_cage, 1, 1, 0);
  for (i = 1; i <= 8; i++) spen.harms[0].add(i * f_cage, 1, 1, 0);

  for (i = 1; i <= 8; i++) ausp.harms[1].add(i * (freq - f_cage), 1, 1, 1);
  for (i = 1; i <= 8; i++) spen.harms[1].add(i * (freq - f_cage), 1, 1, 1);

  // Задаем диапазоны поиска горбов.
  // первые два параметра - частотный диапазон,
  // третий - индекс цвета.
  ausp_hf.humps[0].set(4000, 10000, 0);
  spen_hf.humps[0].set(4000, 10000, 0);

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
  var cnt_harms_ausp_cage = ausp.get_cnt_harms(0, 2, 2);
  console.log("AUSP harms count: " + cnt_harms_ausp_separ);

  var cnt_harms_spen_cage = spen.get_cnt_harms(0, 2, 2);
  console.log("SPEN harms count: " + cnt_harms_spen_separ);

  var cnt_harms_ausp_delta = ausp.get_cnt_harms(1, 2, 2);
  console.log("AUSP harms count: " + cnt_harms_ausp_delta);

  var cnt_harms_spen_delta = spen.get_cnt_harms(1, 2, 2);
  console.log("SPEN harms count: " + cnt_harms_spen_delta);

  // Получение максимального горба в диапазоне.
  // Параметр - индекс диапазона.
  var ausp_hump = ausp_hf.get_max_hump(0);
  var spen_hump = spen_hf.get_max_hump(0);

  if (signal.is_magnetic()) {
    if (cnt_harms_spen_cage >= 2 || cnt_harms_spen_delta >= 2) {
      // реализация логики подтверждения дефекта
      // true - дефект обнаружен
      // false - дефект не обнаружен
      is_defect = true;
    } else if (cnt_harms_ausp_cage >= 1 || cnt_harms_ausp_delta >= 1) {
      is_defect = true;
      comment = "повторить измерение"; //добавлен комментарий
    }
  } else {
    if (
      (cnt_harms_spen_cage >= 2 || cnt_harms_spen_delta >= 2) &&
      (ausp_hump > 3 || spen_hump > 3)
    ) {
      // реализация логики подтверждения дефекта
      // true - дефект обнаружен
      // false - дефект не обнаружен
      is_defect = true;
    } else if (cnt_harms_ausp_cage >= 1 || cnt_harms_ausp_delta >= 1) {
      is_defect = true;
      comment = "повторить измерение"; //добавлен комментарий
    }
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
