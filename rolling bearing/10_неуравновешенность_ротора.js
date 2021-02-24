import "service.js";

function init() {
  // Функция инициализации

  // Задание имени дефекта
  set_name("Неуравновешенность ротора");

  // Добавление колорбокса. первый параметр - цвет, второй - текст
  add_color(0xffff00ff, "Fвр");

  // Задаем цвета спектров
  ausp.set_color(0xff66ff00);
  spen.set_color(0xff66ff00);

  // Задаем кол-во наборов гармоник для спектров
  ausp.set_harms_series_count(1);
  spen.set_harms_series_count(1);

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

  ausp.set_options(freq * 40, 40 * 5, 5, 25);
  spen.set_options(freq * 40, 40 * 5, 5, 75);

  // Задаем частоту фильра спекта огибающей
  var fc = 2000 * math.sqrt(freq);
  spen.set_filter(fc, (fc * 2) / 3);

  // Добавление гармоник на автоспектр.
  // 1 - частота,
  // 2 - вес,
  // 3 - толщина линии,
  // 4 - индек колорбокса, задающего цвет,
  // freq - частота вращения,
  // [индек] - индекс массива набора гармоник.

  for (i = 1; i <= 1; i++) ausp.harms[0].add(i * freq, 1, 1, 0);
  for (i = 1; i <= 2; i++) spen.harms[0].add(i * freq, 1, 1, 0);

  spen.harms[0].set_decay(-0.05);

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

  if (cnt_harms_ausp == 1 && cnt_harms_spen >= 1 && is_decay) {
    // реализация логики подтверждения дефекта
    // true - дефект обнаружен
    // false - дефект не обнаружен
    is_defect = true;
  } else if (XOR(cnt_harms_ausp == 1, cnt_harms_spen == 1)) {
    is_defect = true;
    comment = "повторить измерение"; //добавлен комментарий
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
