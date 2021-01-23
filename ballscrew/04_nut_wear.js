var d_inner = get_parameter("internalD");
var d_outer = get_parameter("outerD");
var d_roller = get_parameter("rollerD");
var angle = get_parameter("angle");
var d_cage = (d_inner + d_outer) / 2;
var z = get_parameter("rollcount");

var f_nut = 0.5 * freq * (1.0 - d_roller * math.cos(angle) / d_cage) * z;


function init()																			//функция инициализации
{
	name = "износ резьбовой поверхности гайки";									//задание имени дефекта
	add_color(0xffff00ff, "Fг");														//добавлнение колорбокса. первый параметр - цвет, второй - текст
}

function display()																			//функция отображения
{
    for(i = 1; i <= 3; i++)
    {
        harms_ausp.add(i * f_nut, 1, 0);													//добавление гармоник на автоспектр. первый параметр - частота, второй толщнина линии, третий - индек колорбокса, задающего цвет. harms_ausp - список отображаемых на автоспектре гармоник. freq - частота вращения.
        harms_spen.add(i * f_nut, 1, 0);													//добавление гармоник на спектр огибающей. harms_spen - список отображаемых на спектре огибающей гармоник.
    }

    harms_ausp.decay = -0.05                                                                //задаем спад
    harms_spen.decay = -0.05
}


function diagnostic()																			//функция диагностики
{
	is_defect = false;																	//инициализация переменных, содержащих результат диагностики
	comment = "";
	

	var cnt_harms_ausp = ausp.get_cnt_harms(1);											//получение кол-ва гармоник присутствующих на автоспектре. параметр "2" - допустимое кол-во пропусщенных в ряду. 
	var cnt_harms_spen = spen.get_cnt_harms(1);											//получение кол-ва гармоник присутствующих на спектре огибающей.

	var is_harms_ausp_decay = ausp.is_harms_decay();                                    //затухают ли гармоники.
	var is_harms_spen_decay = spen.is_harms_decay();

	if (cnt_harms_ausp >= 1 && cnt_harms_ausp <= 3 && is_harms_ausp_decay && cnt_harms_spen >= 1 && cnt_harms_spen <= 3 && is_harms_spen_decay)
	{
		is_defect = true;																			//дефект обнаружен
	}
	else if ((cnt_harms_ausp >= 1 && cnt_harms_ausp <= 3) || (cnt_harms_spen >= 1 && cnt_harms_spen <= 3))
	{
		is_defect = true;
		comment = "повторить измерение";															//добавлен комментарий
	}
} 