import "service.js";

function init() {
  // Функция инициализации

  // Задание имени дефекта
  set_name("перекос винта (02_screw_mesalignment.js)");

  // Добавление колорбокса. первый параметр - цвет, второй - текст
  add_color(0xff00ff00, "Fвнт");

  // Задаем цвета спектров
  ausp.set_color(0xffffff00);
  spen.set_color(0xff00ffff);

  // Задаем кол-во наборов гармоник для спектров
  spen.set_harms_series_count(2);
  ausp.set_harms_series_count(2);

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

  ausp.set_options(1000, 1000, 5, 15);
  spen.set_options(1000, 1000, 5, 25);

  var fc = 2000 * math.sqrt(freq);
  spen.set_filter(fc, (fc * 2) / 3);

  // Добавление гармоник на автоспектр.
  // 1 - частота,
  // 2 - толщнина линии,
  // 3 - индек колорбокса, задающего цвет,
  // freq - частота вращения,
  // [индек] - индекс массива набора гармоник.

  for (i = 1; i <= 11; i++) {
    ausp.harms[(i + 1) % 2].add(i * freq, 1, ((i + 1) % 2) * 2 + 1, 0); //добавление гармоник на автоспектр. первый параметр - частота, второй - вес, третий толщнина линии, четвертый - индек колорбокса, задающего цвет.
    spen.harms[(i + 1) % 2].add(i * freq, 1, ((i + 1) % 2) * 2 + 1, 0); //
  }

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
  var cnt_harms_ausp = ausp.get_cnt_harms(0, 1, 2);
  console.log("AUSP harms count: " + cnt_harms_ausp);

  var cnt_harms_spen = spen.get_cnt_harms(0, 1, 2);
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
    comment = "повторить измерение"; //добавлен комментарий
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}

function display() {
  //функция отображения
}

function diagnostic() {
  //функция диагностики
  var is_defect = false; //инициализация переменных, содержащих результат диагностики
  var comment = "";

  var cnt_harms_ausp = ausp.get_cnt_harms(1, 1, 1); //получение кол-ва гармоник присутствующих на автоспектре. 1-параметр с какой ищем, второй - допустимое кол-во пропусщенных в ряду.
  var cnt_harms_spen = spen.get_cnt_harms(1, 1, 1);

  if (cnt_harms_ausp >= 1 && cnt_harms_spen >= 1) {
    //реализация логики подтверждения дефекта
    is_defect = true; //дефект обнаружен
  } else if (cnt_harms_ausp == 1 || cnt_harms_spen == 1) {
    is_defect = true;
    comment = "повторить измерение"; //добавлен комментарий
  }

  return_result(is_defect, 1, comment);
}
