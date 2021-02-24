import "ballscrew.js";

function init() {
  //функци€ инициализации
  name = "задиры(трещины) гайки_"; //задание имени дефекта
  add_color(0xffff00ff, "Fг"); //добавлнение колорбокса. первый параметр - цвет, второй - текст

  ausp.set_color(0xffffff00); //задаем цвет спектра
  ausp.set_harms_series_count(1); //задаем кол-во наборов гармоник дл€ автостпектра
  ausp_hf.set_humps_count(1); //задаем кол-во диапазонов поиска горбов;

  spen.set_color(0xffff00ff);
  spen.set_harms_series_count(1);
  spen_hf.set_humps_count(1);
}

function display() {
  //функци€ отображени€
  ausp.set_options(1000, 1000, 5, 15); //задаем параметры спектра
  spen.set_options(1000, 1000, 5, 25);

  ausp_hf.set_options(8000, 1000, 5, 15); //задаем параметры спектра
  spen_hf.set_options(8000, 1000, 5, 25);

  var fc = 2000 * math.sqrt(freq);
  spen.set_filter(fc, (fc * 2) / 3); //задаем частоту фильра спекта огибающей

  for (i = 1; i <= 7; i++) {
    // добавление гармоник на автоспектр.
    // первый параметр - частота,
    // второй толщнина линии,
    // третий - индек колорбокса, задающего цвет.
    // harms_ausp - список отображаемых на автоспектре гармоник.
    // freq - частота вращени€.
    ausp.harms[0].add(i * f_nut, 1, 1, 0);

    //добавление гармоник на спектр огибающей. harms_spen - список отображаемых на спектре огибающей гармоник.
    // 1 - сеща€ частота
    // 2 - вес
    // 3 - модулирующа€
    // 4 - вес модулирующей
    // 5 - количество модул€ций
    // 6 - ширина линии несущей
    // 7 - индекс цвета несущей
    // 8 - нирина модулирующей
    // 9 - индекс цвета модулирущей
    spen.harms[0].add_modulated(i * f_nut, 1, freq, 1, 1, 3, 0, 1, 0);
  }

  ausp.harms[0].decay = -0.05; //задаем спад
  spen.harms[0].decay = -0.05;

  ausp_hf.humps[0].set(5000, 10000, 0); //задаем диапазоны поиска горбов. первые два параметра - частотный диапазон, третий - индекс цвета.
  spen_hf.humps[0].set(5000, 10000, 0);
}

function diagnostic() {
  //функци€ диагностики
  var is_defect = false; //инициализаци€ переменных, содержащих результат диагностики
  var comment = "";

  var cnt_harms_ausp = ausp.get_cnt_harms(0, 1, 100); //получение кол-ва гармоник присутствующих на автоспектре. 1-параметр с какой ищем, второй - допустимое кол-во пропусщенных в р€ду.
  var cnt_harms_spen = spen.get_cnt_harms(0, 1, 100);

  var is_harms_ausp_decay = ausp.is_harms_decay(0); //затухают ли гармоники.
  var is_harms_spen_decay = spen.is_harms_decay(0);

  var hump_ausp = ausp_hf.get_max_hump(0); //получение максимального горба в диапазоне. параметр - индекс диапазона
  var hump_spen = spen_hf.get_max_hump(0);

  if (
    cnt_harms_ausp >= 2 &&
    !is_harms_ausp_decay &&
    cnt_harms_spen >= 2 &&
    !is_harms_spen_decay &&
    (hump_ausp > 3 || hump_spen > 3)
  ) {
    is_defect = true; //дефект обнаружен
  } else if (
    (cnt_harms_ausp >= 2 && !is_harms_ausp_decay) ||
    (cnt_harms_spen >= 2 && !is_harms_spen_decay)
  ) {
    is_defect = true;
    comment = "повторить измерение"; //добавлен комментарий
  }

  return_result(is_defect, 1, comment);
}
