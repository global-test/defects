var d_inner = get_parameter("internalD");
var d_outer = get_parameter("outerD");
var d_roller = get_parameter("rollerD");
var angle = get_parameter("angle");
var d_cage = (d_inner + d_outer) / 2;
var z = get_parameter("rollcount");

var f_nut = 0.5 * freq * (1.0 - d_roller * math.cos(angle) / d_cage) * z;


function init()																			//������� �������������
{
	name = "������(�������) �����_";									//������� ����� �������
	add_color(0xffff00ff, "F�");														//����������� ����������. ������ �������� - ����, ������ - �����
}

function display()																			//������� �����������
{
    ausp.set_options(1000, 1000, 5, 15);         //������ ��������� �������
    spen.set_options(1000, 1000, 5, 25);

    var fc = 2000 * math.sqrt(freq);
    spen.set_filter(fc, fc * 2 / 3); //������ ������� ������ ������ ���������

    for(i = 1; i <= 7; i++)
    {
        ausp.harms.add(i * f_nut, 1, 1, 0);													//���������� �������� �� ����������. ������ �������� - �������, ������ - ���, ������ �������� �����, ��������� - ����� ����������, ��������� ����.
        spen.harms.add_modulated(i * f_nut, 1, freq, 1, 1, 3, 0, 1, 0);						//���������� �������������� ��������. ������ �������� - �������, ������ - ���, ������ - ������������ �������, ��������� - ��� ������������ �������, ����� - ���-�� ������������ ��������, ������ - ������� ����� ���������, ������� - ���� ���������, ������� - ������� ������ ������������ ���������, ������� - ���� ������������ ���������.
    }

    ausp.harms.decay = -0.05                                                                //������ ����
    spen.harms.decay = -0.05

    ausp_hf.humps.add(5000, 10000, 1, 0);                                                            //������ ��������� ������ ������. ������ ��� ��������� - ��������� ��������, ������ - ���, ��������� - ������ �����
    spen_hf.humps.add(5000, 10000, 1, 0);
}


function diagnostic()																			//������� �����������
{
	var is_defect = false;																	//������������� ����������, ���������� ��������� �����������
	var comment = "";
	

	var cnt_harms_ausp = ausp.get_cnt_harms(1, 100);            //��������� ���-�� �������� �������������� �� �����������. 1-�������� � ����� ����, ������ - ���������� ���-�� ������������ � ����. 
	var cnt_harms_spen = spen.get_cnt_harms(1, 100);

	var is_harms_ausp_decay = ausp.is_harms_decay();                                    //�������� �� ���������.
	var is_harms_spen_decay = spen.is_harms_decay();

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