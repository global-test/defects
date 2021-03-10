import "service.js";
import "gear_transmission.js";

function init() {
  // ������� �������������

  // ������� ����� �������
  set_name("������� ������� ��������");

  // ���������� ����������. ������ �������� - ����, ������ - �����
  // add_color(0xffff00ff, "F��1");
  add_color(0xff0000ff, "F��2");
  add_color(0xff00fffb, "Fz�F��2");

  // ������ ����� ��������
  ausp.set_color(0xfffbff00);
  spen.set_color(0xfffbff00);

  // ������ ���-�� ������� �������� ��� ��������
  ausp.set_harms_series_count(2);
  spen.set_harms_series_count(2);

  ausp_hf.set_enabled(false);
  spen_hf.set_enabled(false);

  std_log_init();
}

function display() {
  f = freq;
  // ������� �����������
  // ������������ ���������
  // ������ ��������� �������.
  // 1 - ��������� ��������,
  // 2 - ���-�� ����� �������,
  // 3 - ���-�� ����������,
  // 4 - ����������� ������ �����

  ausp.set_options(fz(f) * 4, (fz(f) * 4) / (f2(f) / 8), 5, 25);
  spen.set_options(fz(f) * 4, (fz(f) * 4) / (f2(f) / 8), 5, 75);

  // ������ ������� ������ ������� ���������
  var fc = 2000 * math.sqrt(f);
  spen.set_filter(fc, (fc * 2) / 3);

  // ���������� �������� �� ����������.
  // 1 - �������,
  // 2 - ���,
  // 3 - ������� �����,
  // 4 - ����� ����������, ��������� ����,
  // freq - ������� ��������,
  // [�����] - ������ ������� ������ ��������.

  for (i = 1; i <= 20; i++) ausp.harms[0].add((i * f2(f)) / 2, 1, 1, 0);
  for (i = 1; i <= 20; i++) spen.harms[0].add((i * f2(f)) / 2, 1, 1, 0);

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
  for (i = 1; i <= 3; i++)
    ausp.harms[1].add_modulated(i * fz(f), 1, f2(f), 1, 4, 3, 1, 1, 0);

  for (i = 1; i <= 3; i++)
    spen.harms[1].add_modulated(i * fz(f), 1, f2(f), 1, 3, 3, 1, 1, 0);

  std_log_display();
}

function diagnostic() {
  //������� �����������

  // ������������� ����������, ���������� ��������� �����������
  var is_defect = false;
  var comment = "";

  // ��������� ���-�� �������� �������������� �� �����������.
  // 1 - ������ ������ ��������,
  // 2 - � ����� ��������� ����,
  // 3 - ���������� ���-�� ������������ � ����.
  var cnt_harms_ausp_0 = ausp.get_cnt_harms(0, 2, 2);
  console.log("AUSP harms count (f��2): " + cnt_harms_ausp_0);

  var cnt_harms_spen_0 = spen.get_cnt_harms(0, 2, 2);
  console.log("SPEN harms count (f��2): " + cnt_harms_spen_0);

  // ��� �������� �������� ����: (Fz � F��2)�2 >= 1�
  // get_cnt_harms(int idx, unsigned int from, int fails, int cnt_mod, bool both_sides)
  // 1-3 - ���������� get_cnt_harms(int idx, unsigned int from, int fails);
  // 4 - ����������� ���-�� �������������� ���������;
  // 5 - ������ - � ���� ������, ���� - ���������� � �����;

  var cnt_harms_ausp_1 = ausp.get_cnt_harms(1, 1, 1, 2, true); // � ����� ������
  console.log("AUSP harms count (fz): " + cnt_harms_ausp_1);

  var cnt_harms_spen_1 = spen.get_cnt_harms(1, 1, 1, 2, true); // � ����� ������
  console.log("SPEN harms count (fz): " + cnt_harms_spen_1);

  var cnt_harms_ausp_1_m = ausp.get_cnt_harms(1, 1, 1, 2, false); // ���������� � ����� �������
  console.log("AUSP harms count (fz): " + cnt_harms_ausp_1_m);

  var cnt_harms_spen_1_m = spen.get_cnt_harms(1, 1, 1, 2, false); // ���������� � ����� �������
  console.log("SPEN harms count (fz): " + cnt_harms_spen_1_m);

  if (
    cnt_harms_ausp_0 >= 8 &&
    cnt_harms_spen_0 >= 10 &&
    cnt_harms_ausp_1 >= 1 &&
    cnt_harms_spen_1 >= 1
  ) {
    // ���������� ������ ������������� �������
    // true - ������ ���������
    // false - ������ �� ���������
    is_defect = true;
  } else if (
    (cnt_harms_ausp_0 >= 8 && cnt_harms_ausp_1_m == 1) ||
    (cnt_harms_spen_0 >= 10 && cnt_harms_spen_1_m == 1)
  ) {
    is_defect = true;
    comment = "��������� ���������"; //�������� �����������
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
