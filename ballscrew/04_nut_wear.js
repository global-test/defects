import "ballscrew.js";      

function init()																			//������� �������������
{
	name = "����� ��������� ����������� �����_";									//������� ����� �������
	add_color(0xffff00ff, "F�");														//����������� ����������. ������ �������� - ����, ������ - �����

	ausp.set_color(0xffffff00);                     //������ ���� �������
	ausp.set_harms_series_count(1);     //������ ���-�� ������� �������� ��� ������������

	spen.set_color(0xffff00ff);
	spen.set_harms_series_count(1);
}

function display()																			//������� �����������
{
    ausp.set_options(1000, 1000, 5, 15);         //������ ��������� �������
    spen.set_options(1000, 1000, 5, 25);

    var fc = 2000 * math.sqrt(freq);
    spen.set_filter(fc, fc * 2 / 3); //������ ������� ������ ������ ���������

    for(i = 1; i <= 3; i++)
    {
        ausp.harms[0].add(i * f_nut, 1, 0);													//���������� �������� �� ����������. ������ �������� - �������, ������ �������� �����, ������ - ����� ����������, ��������� ����. harms_ausp - ������ ������������ �� ����������� ��������. freq - ������� ��������.
        spen.harms[0].add(i * f_nut, 1, 0);													//���������� �������� �� ������ ���������. harms_spen - ������ ������������ �� ������� ��������� ��������.
    }

    ausp.harms[0].decay = -0.05;                                                                //������ ����
    //spen.harms[0].decay = -0.05
    spen.harms[0].set_decay(-0.05);
}


function diagnostic()																			//������� �����������
{
	var is_defect = false;																	//������������� ����������, ���������� ��������� �����������
	var comment = "";
	

	var cnt_harms_ausp = ausp.get_cnt_harms(0, 1, 1);          //��������� ���-�� �������� �������������� �� �����������. 1-�������� � ����� ����, ������ - ���������� ���-�� ������������ � ����. 
	var cnt_harms_spen = spen.get_cnt_harms(0, 1, 1);

	var is_harms_ausp_decay = ausp.is_harms_decay(0);                                    //�������� �� ���������.
	var is_harms_spen_decay = spen.is_harms_decay(0);

	if (cnt_harms_ausp >= 1 && cnt_harms_ausp <= 3 && is_harms_ausp_decay && cnt_harms_spen >= 1 && cnt_harms_spen <= 3 && is_harms_spen_decay)
	{
		is_defect = true;																			//������ ���������
	}
	else if ((cnt_harms_ausp >= 1 && cnt_harms_ausp <= 3) || (cnt_harms_spen >= 1 && cnt_harms_spen <= 3))
	{
		is_defect = true;
		comment = "��������� ���������";															//�������� �����������
	}

	return_result(is_defect, 1, comment);
} 