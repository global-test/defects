import "service.js";

function default_init() {
  // ������� �������������

  // ������� ����� �������
  set_name("������������� ����");

  // ���������� ����������. ������ �������� - ����, ������ - �����
  add_color(0xffff00ff, "F��/2");
  add_color(0xff00fffb, "F��/3");

  // ������ ����� ��������
  ausp.set_color(0xffff0867);
  spen.set_color(0xffff0867);

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

  ausp.set_options(f * 10, 10 * 3 * 4, 5, 25);
  spen.set_options(f * 10, 10 * 3 * 4, 5, 75);

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

  for (i = 1; i <= 7; i++) ausp.harms[0].add((i * f) / 2, 1, 1, 0);
  for (i = 1; i <= 7; i++) spen.harms[0].add((i * f) / 2, 1, 1, 0);

  for (i = 1; i <= 7; i++) ausp.harms[1].add((i * f) / 3, 1, 1, 1);
  for (i = 1; i <= 7; i++) spen.harms[1].add((i * f) / 3, 1, 1, 1);

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
  var cnt_harms_ausp_2 = ausp.get_cnt_harms(0, 2, 2);
  console.log("AUSP harms count (f/2): " + cnt_harms_ausp_2);

  var cnt_harms_spen_2 = spen.get_cnt_harms(0, 2, 2);
  console.log("SPEN harms count (f/2): " + cnt_harms_spen_2);

  var cnt_harms_ausp_3 = ausp.get_cnt_harms(1, 2, 2);
  console.log("AUSP harms count (f/3): " + cnt_harms_ausp_3);

  var cnt_harms_spen_3 = spen.get_cnt_harms(1, 2, 2);
  console.log("SPEN harms count (f/3): " + cnt_harms_spen_3);

  if (
    (cnt_harms_ausp_2 >= 3 || cnt_harms_ausp_3 >= 3) &&
    (cnt_harms_spen_2 >= 3 || cnt_harms_spen_3 >= 3)
  ) {
    // ���������� ������ ������������� �������
    // true - ������ ���������
    // false - ������ �� ���������
    is_defect = true;
  } else if (
    cnt_harms_ausp_2 < 3 ||
    cnt_harms_ausp_3 < 3 ||
    cnt_harms_spen_2 < 3 ||
    cnt_harms_spen_3 < 3
  ) {
    is_defect = true;
    comment = "��������� ���������"; //�������� �����������
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
