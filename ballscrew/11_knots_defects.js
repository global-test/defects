function init()																			//функция инициализации
{
	name = "дефекты узлов крепления_";									//задание имени дефекта
	add_color(0xffff00ff, "");														//добавлнение колорбокса. первый параметр - цвет, второй - текст

	ausp.set_slopes_count(1);   //задаем кол-во наклонов
	spen.set_slopes_count(1);
}

function display()																			//функция отображения
{

    ausp.set_options(1000, 1000, 5, 15);         //задаем параметры спектра
    spen.set_options(1000, 1000, 5, 25);

    var fc = 2000 * math.sqrt(freq);
    spen.set_filter(fc, fc * 2 / 3); //задаем частоту фильра спекта огибающей

    ausp.slopes[0].set(0, freq / 2, 0);                                                //задаем параметры наклона. первые два параметра - частотный диапазон, третий - индекс цвета
    spen.slopes[0].set(0, freq / 2, 0);
}


function diagnostic()																			//функция диагностики
{
	var is_defect = false;																	//инициализация переменных, содержащих результат диагностики
	var comment = "";
	
	var slope_ausp = ausp.get_slope(0);                                               //получение наклона. параметр - индекс диапазона
	var slope_spen = spen.get_slope(0);

	if (slope_ausp > 0.4 && slope_spen > 0.2)
	{
		is_defect = true;																			//дефект обнаружен
	}
	else if (slope_spen > 0.2)
	{
		is_defect = true;
		comment = "повторить измерение";															//добавлен комментарий
	}

	return_result(is_defect, 1, comment);
} 