import "ballscrew.js";      


function init()																			//������� �������������
{
	name = "������(�������) �����_";									//������� ����� �������
	add_color(0xffff00ff, "F�");														//����������� ����������. ������ �������� - ����, ������ - �����

	ausp.set_color(0xffffff00);                     //������ ���� �������
	ausp.set_harms_series_count(1);     //������ ���-�� ������� �������� ��� ������������
	ausp_hf.set_humps_count(1);     //������ ���-�� ���������� ������ ������;

	spen.set_color(0xffff00ff);
	spen.set_harms_series_count(1);
	spen_hf.set_humps_count(1);

	
	
}

function display()																			//������� �����������
{
    ausp.set_options(1000, 1000, 5, 15);         //������ ��������� �������
    spen.set_options(1000, 1000, 5, 25);

    ausp_hf.set_options(8000, 1000, 5, 15);         //������ ��������� �������
    spen_hf.set_options(8000, 1000, 5, 25);

    var fc = 2000 * math.sqrt(freq);
    spen.set_filter(fc, fc * 2 / 3); //������ ������� ������ ������ ���������

    for(i = 1; i <= 7; i++)
    {
        ausp.harms[0].add(i * f_nut, 1, 1, 0);													//���������� �������� �� ����������. ������ �������� - �������, ������ �������� �����, ������ - ����� ����������, ��������� ����. harms_ausp - ������ ������������ �� ����������� ��������. freq - ������� ��������.
        //spen.harms[0].add_modulated(i * f_nut, 1, freq, 1, 1, 3, 0, 1, 0);													//���������� �������� �� ������ ���������. harms_spen - ������ ������������ �� ������� ��������� ��������.
        spen.add_modulated_harm(0, i * f_nut, 1, freq, 1, 1, 3, 0, 1, 0);
    }

    ausp.harms[0].decay = -0.05                                                                //������ ����
    spen.harms[0].decay = -0.05

    //ausp_hf.humps[0].set(5000, 10000, 0);                                                            //������ ��������� ������ ������. ������ ��� ��������� - ��������� ��������, ������ - ������ �����.
    ausp_hf.set_humps(0, 5000, 10000, 0);
    spen_hf.humps[0].set(5000, 10000, 0);
}


function diagnostic()																			//������� �����������
{
	var is_defect = false;																	//������������� ����������, ���������� ��������� �����������
	var comment = "";
	

	var cnt_harms_ausp = ausp.get_cnt_harms(0, 1, 100);            //��������� ���-�� �������� �������������� �� �����������. 1-�������� � ����� ����, ������ - ���������� ���-�� ������������ � ����. 
	var cnt_harms_spen = spen.get_cnt_harms(0, 1, 100);

	var is_harms_ausp_decay = ausp.is_harms_decay(0);                                    //�������� �� ���������.
	var is_harms_spen_decay = spen.is_harms_decay(0);

	var hump_ausp = ausp_hf.get_max_hump(0);                                               //��������� ������������� ����� � ���������. �������� - ������ ���������
	var hump_spen = spen_hf.get_max_hump(0);

	if (cnt_harms_ausp >= 2 && !is_harms_ausp_decay && cnt_harms_spen >= 2 && !is_harms_spen_decay && (hump_ausp > 3 || hump_spen > 3))
	{
		is_defect = true;																			//������ ���������
	}
	else if ((cnt_harms_ausp >= 2 && !is_harms_ausp_decay) || (cnt_harms_spen >= 2 && !is_harms_spen_decay))
	{
		is_defect = true;
		comment = "��������� ���������";															//�������� �����������
	}

	return_result(is_defect, 1, comment);
} 