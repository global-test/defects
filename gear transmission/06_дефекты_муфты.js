import "service.js";
import "gear_transmission.js";

function init() {
  // ������� �������������

  // ������� ����� �������
  set_name("������� �����");

  // ���������� ����������. ������ �������� - ����, ������ - �����

  add_color(0xffff00ff, "F��1");
  add_color(0xff0000ff, "F��2");
  // add_color(0xff00fffb, "Fz");

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

function display() {
  f = freq;
  // ������� �����������
  // ������������ ���������
  // ������ ��������� �������.
  // 1 - ��������� ��������,
  // 2 - ���-�� ����� �������,
  // 3 - ���-�� ����������,
  // 4 - ����������� ������ �����
  if (f > f2(f)) {
    ausp.set_options(f * 40, (f * 40) / (f2(f) / 8), 5, 25);
    spen.set_options(f * 40, (f * 40) / (f2(f) / 8), 5, 75);
  } else {
    ausp.set_options(f2(f) * 40, (f2(f) * 40) / (f / 8), 5, 25);
    spen.set_options(f2(f) * 40, (f2(f) * 40) / (f / 8), 5, 75);
  }

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

  for (i = 1; i <= 20; i++) ausp.harms[0].add(i * f, 1, 1, 0);
  for (i = 1; i <= 20; i++) spen.harms[0].add(i * f, 1, 1, 0);

  for (i = 1; i <= 20; i++) ausp.harms[1].add(i * f2(f), 1, 1, 1);
  for (i = 1; i <= 20; i++) spen.harms[1].add(i * f2(f), 1, 1, 1);

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
  console.log("AUSP harms count (f��1): " + cnt_harms_ausp_0);

  var cnt_harms_spen_0 = spen.get_cnt_harms(0, 2, 2);
  console.log("SPEN harms count (f��1): " + cnt_harms_spen_0);

  var cnt_harms_ausp_1 = ausp.get_cnt_harms(1, 2, 2);
  console.log("AUSP harms count (f��2): " + cnt_harms_ausp_1);

  var cnt_harms_spen_1 = spen.get_cnt_harms(1, 2, 2);
  console.log("SPEN harms count (f��2): " + cnt_harms_spen_1);

  if (
    cnt_harms_ausp_0 >= 4 &&
    cnt_harms_spen_0 >= 4 &&
    cnt_harms_ausp_1 >= 4 &&
    cnt_harms_spen_1 >= 4
  ) {
    // ���������� ������ ������������� �������
    // true - ������ ���������
    // false - ������ �� ���������
    is_defect = true;
  } else if (
    (cnt_harms_ausp_0 >= 2 && cnt_harms_ausp_1 >= 2) ||
    (cnt_harms_spen_0 >= 2 && cnt_harms_spen_1 >= 2)
  ) {
    is_defect = true;
    comment = "��������� ���������"; //�������� �����������
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
