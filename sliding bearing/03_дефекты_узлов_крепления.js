import "service.js";

function init() {
  //функция инициализации
  set_name("Дефекты узлов крепления");

  // задание имени дефекта
  add_color(0xffd5ff00, "alpha");

  ausp.set_slopes_count(1);
  spen.set_slopes_count(1);

  ausp.set_color(0xff175e15);
  spen.set_color(0xff175e15);

  std_log_init();
}

function display() {
  f = freq;
  //функция отображения
  ausp.set_options(f * 20, 20 * 3, 5, 15); //задаем параметры спектра
  spen.set_options(f * 20, 20 * 3, 5, 25);

  var fc = 2000 * math.sqrt(f);
  spen.set_filter(fc, (fc * 2) / 3); //задаем частоту фильра спекта огибающей

  // задаем параметры наклона.
  // первые два параметра - частотный диапазон,
  // третий - индекс цвета
  ausp.slopes[0].set(0, f / 2, 0);
  spen.slopes[0].set(0, f / 2, 0);

  std_log_display();
}

function diagnostic() {
  //функция диагностики
  var is_defect = false; //инициализация переменных, содержащих результат диагностики
  var comment = "";

  //получение наклона. параметр - индекс диапазона
  var slope_ausp = ausp.get_slope(0);
  var slope_spen = spen.get_slope(0);

  if (slope_ausp > 0.4 && slope_spen > 0.2) {
    is_defect = true; //дефект обнаружен
  } else if (slope_spen > 0.2) {
    is_defect = true;
    comment = "повторить измерение"; //добавлен комментарий
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
