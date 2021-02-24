import "service.js";
import "ballscrew.js";

function init() {
  // Функция инициализации

  // Задание имени дефекта
  set_name("Износ резьбовой поверхности винта");

  // Добавление колорбокса. первый параметр - цвет, второй - текст
  add_color(0xffff00ff, "Fврв");
  add_color(0xff00fffb, "Fвнт");

  // Задаем цвета спектров
  ausp.set_color(0xfffbff00);
  spen.set_color(0xfffbff00);

  ausp_hf.set_color(0xfffbff00);
  spen_hf.set_color(0xfffbff00);

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

  ausp.set_options(f_vnt * 7, (f_vnt * 7) / (freq / 5), 5, 25);
  spen.set_options(f_vnt * 7, (f_vnt * 7) / (freq / 5), 5, 75);

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

  for (i = 1; i <= 8; i++) ausp.harms[0].add(i * freq, 1, 1, 0);
  for (i = 1; i <= 6; i++) spen.harms[0].add(i * freq, 1, 1, 0);

  for (i = 1; i <= 4; i++) ausp.harms[1].add(i * f_vnt, 1, 1, 1);
  for (i = 1; i <= 4; i++) spen.harms[1].add(i * f_vnt, 1, 1, 1);

  spen.harms[0].set_decay(-0.01);

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
  var cnt_harms_ausp = ausp.get_cnt_harms(0, 1, 1);
  console.log("AUSP harms count: " + cnt_harms_ausp);

  var cnt_harms_spen = spen.get_cnt_harms(0, 1, 1);
  console.log("SPEN harms count: " + cnt_harms_spen);

  var is_decay = spen.is_harms_decay(0);

  // Получение максимального горба в диапазоне.
  // Параметр - индекс диапазона.
  var ausp_hump = ausp_hf.get_max_hump(0);
  var spen_hump = spen_hf.get_max_hump(0);

  if (signal.is_magnetic()) {
    if (cnt_harms_ausp >= 2 && cnt_harms_spen >= 2 && is_decay) {
      // реализация логики подтверждения дефекта
      // true - дефект обнаружен
      // false - дефект не обнаружен
      is_defect = true;
    } else if (cnt_harms_ausp == 1 || cnt_harms_spen == 1) {
      is_defect = true;
      comment = "повторить измерение"; //добавлен комментарий
    }
  } else {
    if (
      cnt_harms_ausp >= 2 &&
      cnt_harms_spen >= 2 &&
      is_decay &&
      (ausp_hump > 3 || spen_hump > 3)
    ) {
      // реализация логики подтверждения дефекта
      // true - дефект обнаружен
      // false - дефект не обнаружен
      is_defect = true;
    } else if (cnt_harms_ausp == 1 || cnt_harms_spen == 1) {
      is_defect = true;
      comment = "повторить измерение"; //добавлен комментарий
    }
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
