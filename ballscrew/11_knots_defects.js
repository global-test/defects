function init()																			//функция инициализации
{
	name = "дефекты узлов крепления";									//задание имени дефекта
	add_color(0xffff00ff, "");														//добавлнение колорбокса. первый параметр - цвет, второй - текст
}

function display()																			//функция отображения
{
    slopes_ausp.add(0, freq / 2, 0);                                                //задаем наклон. первые два параметра - частотный диапазон, третий - индекс цвета
    slopes_spen.add(0, freq / 2, 0);
}


function diagnostic()																			//функция диагностики
{
	is_defect = false;																	//инициализация переменных, содержащих результат диагностики
	comment = "";
	
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
} 