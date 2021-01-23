var d_inner = get_parameter("internalD");
var d_outer = get_parameter("outerD");
var d_roller = get_parameter("rollerD");
var angle = get_parameter("angle");
var d_cage = (d_inner + d_outer) / 2;
var z = get_parameter("rollcount");

var f_nut = 0.5 * freq * (1.0 - d_roller * math.cos(angle) / d_cage) * z;


function init()																			//������� �������������
{
	name = "������(�������) �����";									//������� ����� �������
	add_color(0xffff00ff, "F�");														//����������� ����������. ������ �������� - ����, ������ - �����
}

function display()																			//������� �����������
{
    for(i = 1; i <= 7; i++)
    {
        harms_ausp.add(i * f_nut, 1, 0);													//���������� �������� �� ����������. ������ �������� - �������, ������ �������� �����, ������ - ����� ����������, ��������� ����. harms_ausp - ������ ������������ �� ����������� ��������. freq - ������� ��������.
        harms_spen.add_modulated(i * f_nut, freq, 1, 3, 0, 1, 0);													//���������� �������� �� ������ ���������. harms_spen - ������ ������������ �� ������� ��������� ��������.
    }

    harms_ausp.decay = -0.05                                                                //������ ����
    harms_spen.decay = -0.05

    humps_ausp.add(5000, 10000, 0);                                                            //������ ��������� ������ ������. ������ ��� ��������� - ��������� ��������, ������ - ������ �����
    humps_spen.add(5000, 10000, 0);
}


function diagnostic()																			//������� �����������
{
	is_defect = false;																	//������������� ����������, ���������� ��������� �����������
	comment = "";
	

	var cnt_harms_ausp = ausp.get_cnt_harms(100);											//��������� ���-�� �������� �������������� �� �����������. �������� "2" - ���������� ���-�� ������������ � ����. 
	var cnt_harms_spen = spen.get_cnt_harms(100);											//��������� ���-�� �������� �������������� �� ������� ���������.

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
} 