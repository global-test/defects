import "service.js";
import "rolling_bearing/rolling_bearing.js";

function default_init() {
  // Функция инициализации

  // Задание имени дефекта
  set_name("Износ беговой дорожки наружного кольца");

  // Добавление колорбокса. первый параметр - цвет, второй - текст
  add_color(0xff004dff, "Fн");

  // Задаем цвета спектров
  ausp.set_color(0xffff0867);
  spen.set_color(0xffff0867);

  // Задаем кол-во наборов гармоник для спектров
  ausp.set_harms_series_count(1);
  spen.set_harms_series_count(1);

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

  for (i = 1; i <= 3; i++) ausp.harms[0].add(i * f_outer(f), 1, 1, 0);
  for (i = 1; i <= 3; i++) spen.harms[0].add(i * f_outer(f), 1, 1, 0);

  ausp.harms[0].set_decay(-0.01);
  spen.harms[0].set_decay(-0.01);

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
  var cnt_harms_ausp = ausp.get_cnt_harms(0, 1, 1);
  console.log("AUSP harms count: " + cnt_harms_ausp);

  var cnt_harms_spen = spen.get_cnt_harms(0, 1, 1);
  console.log("SPEN harms count: " + cnt_harms_spen);

  if (
    cnt_harms_ausp >= 1 &&
    cnt_harms_ausp <= 3 &&
    ausp.is_harms_decay(0) &&
    cnt_harms_spen >= 1 &&
    cnt_harms_spen <= 3 &&
    spen.is_harms_decay(0)
  ) {
    // реализация логики подтверждения дефекта
    // true - дефект обнаружен
    // false - дефект не обнаружен
    is_defect = true;
  } else if (
    (cnt_harms_ausp >= 1 && cnt_harms_ausp <= 3) ||
    (cnt_harms_spen >= 1 && cnt_harms_spen <= 3)
  ) {
    is_defect = true;
    comment = "повторить измерение"; //добавлен комментарий
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
