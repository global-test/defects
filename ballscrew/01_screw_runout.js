function init()																			//функция инициализации
{
	name = "биение винта_";																	//задание имени дефекта
	add_color(0xff00ff00, "Fвнт");														//добавлнение колорбокса. первый параметр - цвет, второй - текст

	ausp.set_color(0xffffff00);                     //задаем цвет спектра
	spen.set_color(0xffff00ff);
}

function display()																			//функция отображения
{
    console.log("### биение винта ###");
    console.log("### display ###");
    console.log("### " + ausp.signal_name() + " ###");

    console.log("freq: " + freq);

    ausp.set_options(1000, 1000, 5, 15);         //задаем параметры спектра. первый параметр - частотный диапазон, второй - кол-во точек спектра, третий - кол-во усреднений, четверный - сглаживание желтой линии
    spen.set_options(1000, 1000, 5, 25);


    var fc = 2000 * math.sqrt(freq);
    spen.set_filter(fc, fc * 2 / 3); //задаем частоту фильра спекта огибающей


	for(i = 1; i <= 7; i++)
		ausp.harms.add(i*freq, 1, 0);													//добавление гармоник на автоспектр. первый параметр - частота, второй толщнина линии, третий - индек колорбокса, задающего цвет. harms_ausp - список отображаемых на автоспектре гармоник. freq - частота вращения.

	for(i = 1; i <= 9; i++)
		spen.harms.add(i*freq, 1, 0);													//добавление гармоник на спектр огибающей. harms_spen - список отображаемых на спектре огибающей гармоник.
}


function diagnostic()																			//функция диагностики
{
	var is_defect = false;																	//инициализация переменных, содержащих результат диагностики
	var comment = "";

	console.log("############### diagnostic ###############");
	console.log("  ############ биение винта ############");
	console.log("### " + ausp.signal_name() + " ###");

	var cnt_harms_ausp = ausp.get_cnt_harms(1, 2);											//получение кол-ва гармоник присутствующих на автоспектре. 1-параметр с какой ищем, второй - допустимое кол-во пропусщенных в ряду. 
	var cnt_harms_spen = spen.get_cnt_harms(1, 2);

	console.log(cnt_harms_ausp);
	console.log(cnt_harms_spen);

	if (cnt_harms_ausp >= 3 && cnt_harms_ausp <= 7 && cnt_harms_spen >= 3 && cnt_harms_spen <= 9)	//реализация логики подтверждения дефекта
	{
		is_defect = true;																			//дефект обнаружен
	}
	else if (cnt_harms_ausp >= 1 && cnt_harms_ausp <= 2 && cnt_harms_spen >= 1 && cnt_harms_spen <= 2)
	{
	    is_defect = true;
	    comment = "повторить измерение";															//добавлен комментарий
	}

	console.log(is_defect + ", " + comment);

	return_result(is_defect, 1, comment);
} 