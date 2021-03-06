function init()																			//������� �������������
{
	name = "������ �����_";																	//������� ����� �������
	add_color(0xff00ff00, "F���");														//����������� ����������. ������ �������� - ����, ������ - �����

	ausp.set_color(0xffff0867);                     //������ ���� �������
	ausp.set_harms_series_count(1);     //������ ���-�� ������� �������� ��� ������������

	spen.set_color(0xffd5ff00);
	spen.set_harms_series_count(1);

	ausp_hf.set_enabled(false);
	spen_hf.set_enabled(false);
}

function display()																			//������� �����������
{
    console.log("### ������ ����� ###");
    console.log("### display ###");
    console.log("### " + signal.get_name() + " ###");
    console.log("is_magnetic: " + signal.is_magnetic());
    console.log("type: " + parent.get_type());

    console.log("freq: " + freq);

    ausp.set_options(1000, 1000, 5, 15);         //������ ��������� �������. ������ �������� - ��������� ��������, ������ - ���-�� ����� �������, ������ - ���-�� ����������, ��������� - ����������� ������ �����
    spen.set_options(1000, 1000, 5, 25);


    var fc = 2000 * math.sqrt(freq);
    spen.set_filter(fc, fc * 2 / 3); //������ ������� ������ ������ ���������


    for (i = 1; i <= 7; i++)
        ausp.add_harm(0, i * freq, 1, 1, 0);
		//ausp.harms[0].add(i*freq, 1, 1, 0);													//���������� �������� �� ����������. ������ �������� - �������, ������ �������� �����, ������ - ����� ����������, ��������� ����. harms_ausp - ������ ������������ �� ����������� ��������. freq - ������� ��������.

	for(i = 1; i <= 9; i++)
		spen.harms[0].add(i*freq, 1, 0);													//���������� �������� �� ������ ���������. harms_spen - ������ ������������ �� ������� ��������� ��������.
}


function diagnostic()																			//������� �����������
{
	var is_defect = false;																	//������������� ����������, ���������� ��������� �����������
	var comment = "";

	console.log("############### diagnostic ###############");
	console.log("  ############ ������ ����� ############");
	console.log("### " + signal.get_name() + " ###");

	var cnt_harms_ausp = ausp.get_cnt_harms(0, 1, 2);											//��������� ���-�� �������� �������������� �� �����������. 1 �������� - ������ ������ ��������, 2 �������� - � ����� ��������� ����, 3 - ���������� ���-�� ������������ � ����. 
	var cnt_harms_spen = spen.get_cnt_harms(0, 1, 2);

	console.log(cnt_harms_ausp);
	console.log(cnt_harms_spen);

	if (cnt_harms_ausp >= 3 && cnt_harms_ausp <= 7 && cnt_harms_spen >= 3 && cnt_harms_spen <= 9)	//���������� ������ ������������� �������
	{
		is_defect = true;																			//������ ���������
	}
	else if (cnt_harms_ausp >= 1 && cnt_harms_ausp <= 2 && cnt_harms_spen >= 1 && cnt_harms_spen <= 2)
	{
	    is_defect = true;
	    comment = "��������� ���������";															//�������� �����������
	}

	console.log(is_defect + ", " + comment);

	return_result(is_defect, 1, comment);
} 