import "service.js";
import "rolling_bearing/rolling_bearing.js";

function default_init() {
  // ������� �������������

  // ������� ����� �������
  set_name("�������� � ����� �� ����� �������");

  // ���������� ����������. ������ �������� - ����, ������ - �����
  add_color(0xffff1e00, "F��");
  add_color(0xff00ff55, "�Fc");

  // ������ ����� ��������
  ausp.set_color(0xff006aff);
  spen.set_color(0xff006aff);

  // ������ ���-�� ������� �������� ��� ��������
  ausp.set_harms_series_count(2);
  spen.set_harms_series_count(2);

  ausp_hf.set_enabled(false);
  spen_hf.set_enabled(false);

  std_log_init();
}

function default_display(f) {
  // ������� �����������
  // ������������ ���������
  // ������ ��������� �������.
  // 1 - ��������� ��������,
  // 2 - ���-�� ����� �������,
  // 3 - ���-�� ����������,
  // 4 - ����������� ������ �����

  ausp.set_options(f_tk(f) * 20, (f_tk(f) * 20) / (f_cage(f) / 4), 5, 25);
  spen.set_options(f_tk(f) * 20, (f_tk(f) * 20) / (f_cage(f) / 4), 5, 75);

  // ������ ������� ������ ������� ���������
  var fc = 2000 * math.sqrt(f);
  spen.set_filter(fc, (fc * 2) / 3);

  // ���������� �������� �� ������ ���������. harms_spen - ������ ������������ �� ������� ��������� ��������.
  // 1 - ������� �������
  // 2 - ���
  // 3 - ������������
  // 4 - ��� ������������
  // 5 - ���������� ���������
  // 6 - ������ ����� �������
  // 7 - ������ ����� �������
  // 8 - ������ ������������
  // 9 - ������ ����� �����������
  for (i = 1; i <= 7; i++)
    ausp.harms[0].add_modulated(i * f_tk(f), 1, f_cage(f), 1, 2, 1, 0, 1, 1);

  // ���������� �������� �� ������ ���������. harms_spen - ������ ������������ �� ������� ��������� ��������.
  // 1 - ������� �������
  // 2 - ���
  // 3 - ������������
  // 4 - ��� ������������
  // 5 - ���������� ���������
  // 6 - ������ ����� �������
  // 7 - ������ ����� �������
  // 8 - ������ ������������
  // 9 - ������ ����� �����������
  for (i = 1; i <= 7; i++)
    spen.harms[0].add_modulated(i * f_tk(f), 1, f_cage(f), 1, 2, 1, 0, 1, 1);

  // ���������� �������� �� ����������.
  // 1 - �������,
  // 2 - ���,
  // 3 - ������� �����,
  // 4 - ����� ����������, ��������� ����,
  // freq - ������� ��������,
  // [�����] - ������ ������� ������ ��������.
  for (i = 1; i <= 3; i++) ausp.harms[1].add(2 * i * f_tk(f), 1, 3, 0);
  for (i = 1; i <= 3; i++) spen.harms[1].add(2 * i * f_tk(f), 1, 3, 0);

  std_log_display();
}

function default_diagnostic() {
  //������� �����������

  // ������������� ����������, ���������� ��������� �����������
  var is_defect = false;
  var comment = "";

  // ��������� ���-�� �������� �������������� �� �����������.
  // 1 - ������ ������ ��������,
  // 2 - � ����� ��������� ����,
  // 3 - ���������� ���-�� ������������ � ����.
  var cnt_harms_ausp = ausp.get_cnt_harms(0, 2, 2);
  console.log("AUSP harms count: " + cnt_harms_ausp);

  var cnt_harms_spen = spen.get_cnt_harms(0, 2, 2);
  console.log("SPEN harms count: " + cnt_harms_spen);

  if (cnt_harms_spen >= 1) {
    // ���������� ������ ������������� �������
    // true - ������ ���������
    // false - ������ �� ���������
    is_defect = true;
  } else if (cnt_harms_ausp >= 1) {
    is_defect = true;
    comment = "��������� ���������"; //�������� �����������
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}