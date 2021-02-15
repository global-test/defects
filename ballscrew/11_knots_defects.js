function init()																			//������� �������������
{
	name = "������� ����� ���������_";									//������� ����� �������
	add_color(0xffff00ff, "");														//����������� ����������. ������ �������� - ����, ������ - �����
}

function display()																			//������� �����������
{

    ausp.set_options(1000, 1000, 5, 15);         //������ ��������� �������
    spen.set_options(1000, 1000, 5, 25);

    var fc = 2000 * math.sqrt(freq);
    spen.set_filter(fc, fc * 2 / 3); //������ ������� ������ ������ ���������

    ausp.slopes.add(0, freq / 2, 0);                                                //������ ������. ������ ��� ��������� - ��������� ��������, ������ - ������ �����
    spen.slopes.add(0, freq / 2, 0);
}


function diagnostic()																			//������� �����������
{
	var is_defect = false;																	//������������� ����������, ���������� ��������� �����������
	var comment = "";
	
	var slope_ausp = ausp.get_slope(0);                                               //��������� �������. �������� - ������ ���������
	var slope_spen = spen.get_slope(0);

	if (slope_ausp > 0.4 && slope_spen > 0.2)
	{
		is_defect = true;																			//������ ���������
	}
	else if (slope_spen > 0.2)
	{
		is_defect = true;
		comment = "��������� ���������";															//�������� �����������
	}

	return_result(is_defect, 1, comment);
} 