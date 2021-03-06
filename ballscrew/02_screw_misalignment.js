function init()																			//������� �������������
{
	name = "������� �����_";																	//������� ����� �������
	add_color(0xff00ff00, "F���");														//����������� ����������. ������ �������� - ����, ������ - �����

	ausp.set_color(0xffffff00);                     //������ ���� �������
	ausp.set_harms_series_count(2);     //������ ���-�� ������� �������� ��� ������������

	spen.set_color(0xff00ffff);                     //������ ���� �������
	spen.set_harms_series_count(2);
}

function display()																			//������� �����������
{
    ausp.set_options(1000, 1000, 5, 15);         //������ ��������� �������
    spen.set_options(1000, 1000, 5, 25);

    var fc = 2000 * math.sqrt(freq);
    spen.set_filter(fc, fc * 2 / 3); //������ ������� ������ ������ ���������

    for(i = 1; i <= 11; i++)
    {
        ausp.harms[(i + 1) % 2].add(i * freq, 1, ((i + 1) % 2) * 2 + 1, 0);													//���������� �������� �� ����������. ������ �������� - �������, ������ - ���, ������ �������� �����, ��������� - ����� ����������, ��������� ����.
        spen.harms[(i + 1) % 2].add(i * freq, 1, ((i + 1) % 2) * 2 + 1, 0);													//
    }
}


function diagnostic()																			//������� �����������
{
	var is_defect = false;																	//������������� ����������, ���������� ��������� �����������
	var comment = "";

	var cnt_harms_ausp = ausp.get_cnt_harms(1, 1, 1);											//��������� ���-�� �������� �������������� �� �����������. 1-�������� � ����� ����, ������ - ���������� ���-�� ������������ � ����. 
	var cnt_harms_spen = spen.get_cnt_harms(1, 1, 1);

	if (cnt_harms_ausp >= 1 && cnt_harms_spen >= 1)                                 	//���������� ������ ������������� �������
	{
		is_defect = true;																			//������ ���������
	}
	else if (cnt_harms_ausp == 1 || cnt_harms_spen == 1)
	{
		is_defect = true;
		comment = "��������� ���������";															//�������� �����������
	}

	return_result(is_defect, 1, comment);
} 