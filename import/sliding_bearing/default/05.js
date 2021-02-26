import "service.js";

function default_init() {
  // ������� �������������

  // ������� ����� �������
  set_name("������� ����������");

  // ���������� ����������. ������ �������� - ����, ������ - �����
  add_color(0xffff00ff, "F��");

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

  ausp.set_options(f * 40, 40 * 5, 5, 25);
  spen.set_options(f * 40, 40 * 5, 5, 75);

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

  for (i = 1; i <= 10; i++) ausp.harms[0].add(i * f, 1, 1, 0);
  for (i = 1; i <= 10; i++) spen.harms[0].add(i * f, 1, 1, 0);

  for (i = 1; i <= 5; i++) spen.harms[1].add(2 * i * f, 1, 3, 1);

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

  var cnt_harms_spen = spen.get_cnt_harms(1, 1, 1);
  console.log("SPEN harms count: " + cnt_harms_spen);

  if (cnt_harms_ausp >= 2 && cnt_harms_spen >= 1) {
    // ���������� ������ ������������� �������
    // true - ������ ���������
    // false - ������ �� ���������
    is_defect = true;
  } else if (cnt_harms_ausp == 1 || cnt_harms_spen == 1) {
    is_defect = true;
    comment = "��������� ���������"; //�������� �����������
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}