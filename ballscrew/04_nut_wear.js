var d_inner = get_parameter("internalD");
var d_outer = get_parameter("outerD");
var d_roller = get_parameter("rollerD");
var angle = get_parameter("angle");
var d_cage = (d_inner + d_outer) / 2;
var z = get_parameter("rollcount");

var f_nut = 0.5 * freq * (1.0 - d_roller * math.cos(angle) / d_cage) * z;


function init()																			//������� �������������
{
	name = "����� ��������� ����������� �����";									//������� ����� �������
	add_color(0xffff00ff, "F�");														//����������� ����������. ������ �������� - ����, ������ - �����
}

function display()																			//������� �����������
{
    for(i = 1; i <= 3; i++)
    {
        harms_ausp.add(i * f_nut, 1, 0);													//���������� �������� �� ����������. ������ �������� - �������, ������ �������� �����, ������ - ����� ����������, ��������� ����. harms_ausp - ������ ������������ �� ����������� ��������. freq - ������� ��������.
        harms_spen.add(i * f_nut, 1, 0);													//���������� �������� �� ������ ���������. harms_spen - ������ ������������ �� ������� ��������� ��������.
    }

    harms_ausp.decay = -0.05                                                                //������ ����
    harms_spen.decay = -0.05
}


function diagnostic()																			//������� �����������
{
	is_defect = false;																	//������������� ����������, ���������� ��������� �����������
	comment = "";
	

	var cnt_harms_ausp = ausp.get_cnt_harms(1);											//��������� ���-�� �������� �������������� �� �����������. �������� "2" - ���������� ���-�� ������������ � ����. 
	var cnt_harms_spen = spen.get_cnt_harms(1);											//��������� ���-�� �������� �������������� �� ������� ���������.

	var is_harms_ausp_decay = ausp.is_harms_decay();                                    //�������� �� ���������.
	var is_harms_spen_decay = spen.is_harms_decay();

	if (cnt_harms_ausp >= 1 && cnt_harms_ausp <= 3 && is_harms_ausp_decay && cnt_harms_spen >= 1 && cnt_harms_spen <= 3 && is_harms_spen_decay)
	{
		is_defect = true;																			//������ ���������
	}
	else if ((cnt_harms_ausp >= 1 && cnt_harms_ausp <= 3) || (cnt_harms_spen >= 1 && cnt_harms_spen <= 3))
	{
		is_defect = true;
		comment = "��������� ���������";															//�������� �����������
	}
} 