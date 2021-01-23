function init()																			//������� �������������
{
	name = "������� ����� ���������";									//������� ����� �������
	add_color(0xffff00ff, "");														//����������� ����������. ������ �������� - ����, ������ - �����
}

function display()																			//������� �����������
{
    slopes_ausp.add(0, freq / 2, 0);                                                //������ ������. ������ ��� ��������� - ��������� ��������, ������ - ������ �����
    slopes_spen.add(0, freq / 2, 0);
}


function diagnostic()																			//������� �����������
{
	is_defect = false;																	//������������� ����������, ���������� ��������� �����������
	comment = "";
	
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
} 