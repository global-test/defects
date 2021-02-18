var d_inner = get_parameter("internalD");
var d_outer = get_parameter("outerD");
var d_roller = get_parameter("rollerD");
var angle = get_parameter("angle");
var d_cage = (d_inner + d_outer) / 2;
var z = get_parameter("rollcount");

var f_nut = 0.5 * freq * (1.0 - d_roller * math.cos(angle) / d_cage) * z;


function init()																			//функция инициализации
{
	name = "задиры(трещины) гайки_";									//задание имени дефекта
	add_color(0xffff00ff, "Fг");														//добавлнение колорбокса. первый параметр - цвет, второй - текст

	ausp.set_color(0xffffff00);                     //задаем цвет спектра
	ausp.set_harms_series_count(1);     //задаем кол-во наборов гармоник для автостпектра

	spen.set_color(0xffff00ff);
	spen.set_harms_series_count(1);
}

function display()																			//функция отображения
{
    ausp.set_options(1000, 1000, 5, 15);         //задаем параметры спектра
    spen.set_options(1000, 1000, 5, 25);

    var fc = 2000 * math.sqrt(freq);
    spen.set_filter(fc, fc * 2 / 3); //задаем частоту фильра спекта огибающей

    for(i = 1; i <= 7; i++)
    {
        ausp.harms[0].add(i * f_nut, 1, 1, 0);													//добавление гармоник на автоспектр. первый параметр - частота, второй толщнина линии, третий - индек колорбокса, задающего цвет. harms_ausp - список отображаемых на автоспектре гармоник. freq - частота вращения.
        spen.harms[0].add_modulated(i * f_nut, 1, freq, 1, 1, 3, 0, 1, 0);													//добавление гармоник на спектр огибающей. harms_spen - список отображаемых на спектре огибающей гармоник.
    }

    ausp.harms[0].decay = -0.05                                                                //задаем спад
    spen.harms[0].decay = -0.05

    ausp_hf.humps.add(5000, 10000, 0);                                                            //задаем диапазоны поиска горбов. первые два параметра - частотный диапазон, третие - индекс цвета
    spen_hf.humps.add(5000, 10000, 0);
}


function diagnostic()																			//функция диагностики
{
	var is_defect = false;																	//инициализация переменных, содержащих результат диагностики
	var comment = "";
	

	var cnt_harms_ausp = ausp.get_cnt_harms(0, 1, 100);            //получение кол-ва гармоник присутствующих на автоспектре. 1-параметр с какой ищем, второй - допустимое кол-во пропусщенных в ряду. 
	var cnt_harms_spen = spen.get_cnt_harms(0, 1, 100);

	var is_harms_ausp_decay = ausp.is_harms_decay(0);                                    //затухают ли гармоники.
	var is_harms_spen_decay = spen.is_harms_decay(0);

	var hump_ausp = ausp_hf.get_max_hump(0);                                               //получение максимального горба в диапазоне. параметр - индекс диапазона
	var hump_spen = spen_hf.get_max_hump(0);

	if (cnt_harms_ausp >= 2 && !is_harms_ausp_decay && cnt_harms_spen >= 2 && !is_harms_spen_decay && (hump_ausp > 3 || hump_spen > 3))
	{
		is_defect = true;																			//дефект обнаружен
	}
	else if ((cnt_harms_ausp >= 2 && !is_harms_ausp_decay) || (cnt_harms_spen >= 2 && !is_harms_spen_decay))
	{
		is_defect = true;
		comment = "повторить измерение";															//добавлен комментарий
	}

	return_result(is_defect, 1, comment);
} 