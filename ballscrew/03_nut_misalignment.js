var d_inner = get_parameter("internalD");
var d_outer = get_parameter("outerD");
var d_roller = get_parameter("rollerD");
var angle = get_parameter("angle");
var d_cage = (d_inner + d_outer) / 2;
var z = get_parameter("rollcount");

var f_nut = 0.5 * freq * (1.0 - d_roller * math.cos(angle) / d_cage) * z;


function init()																			//функция инициализации
{
	name = "перекос гайки_";																	//задание имени дефекта
	add_color(0xffff00ff, "Fг");														//добавлнение колорбокса. первый параметр - цвет, второй - текст

	ausp.set_color(0xffffff00);                     //задаем цвет спектра
	ausp.set_harms_series_count(2);     //задаем кол-во наборов гармоник для автостпектра

	spen.set_color(0xff00ffff);                     //задаем цвет спектра
	spen.set_harms_series_count(2);
}

function display()																			//функция отображения
{
    ausp.set_options(1000, 1000, 5, 15);         //задаем параметры спектра
    spen.set_options(1000, 1000, 5, 25);

    var fc = 2000 * math.sqrt(freq);
    spen.set_filter(fc, fc * 2 / 3); //задаем частоту фильра спекта огибающей

    for(i = 1; i <= 7; i++)
    {
        ausp.harms[(i + 1) % 2].add(i * f_nut, 1, ((i + 1) % 2) * 2 + 1, 0);													//добавление гармоник на автоспектр. первый параметр - частота, второй - вес, третий толщнина линии, четвертый - индек колорбокса, задающего цвет.
        spen.harms[(i + 1) % 2].add(i * f_nut, 1, ((i + 1) % 2) * 2 + 1, 0);													//
    }
}


function diagnostic()																			//функция диагностики
{
	var is_defect = false;																	//инициализация переменных, содержащих результат диагностики
	var comment = "";

	var cnt_harms_ausp = ausp.get_cnt_harms(1, 1, 1);          //получение кол-ва гармоник присутствующих на автоспектре. 1-параметр с какой ищем, второй - допустимое кол-во пропусщенных в ряду. 
	var cnt_harms_spen = spen.get_cnt_harms(1, 1, 1);

	if (cnt_harms_ausp >= 1 && cnt_harms_spen >= 1)                                 	//реализация логики подтверждения дефекта
	{
		is_defect = true;																			//дефект обнаружен
	}
	else if (cnt_harms_ausp == 1 || cnt_harms_spen == 1)
	{
		is_defect = true;
		comment = "повторить измерение";															//добавлен комментарий
	}

	return_result(is_defect, 1, comment);
} 