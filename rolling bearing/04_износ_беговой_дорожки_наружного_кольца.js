import "service.js";
import "rolling_bearing.js";

function init() {
  // ������� �������������

  // ������� ����� �������
  set_name("����� ������� ������� ��������� ������");

  // ���������� ����������. ������ �������� - ����, ������ - �����
  add_color(0xff004dff, "F�");

  // ������ ����� ��������
  ausp.set_color(0xffff0867);
  spen.set_color(0xffff0867);

  // ������ ���-�� ������� �������� ��� ��������
  ausp.set_harms_series_count(1);
  spen.set_harms_series_count(1);

  std_log_init();
}

function display() {
  // ������� �����������
  // ������������ ���������
  // ������ ��������� �������.
  // 1 - ��������� ��������,
  // 2 - ���-�� ����� �������,
  // 3 - ���-�� ����������,
  // 4 - ����������� ������ �����

  ausp.set_options(f_outer * 7, (f_outer * 7) / (freq / 4), 5, 25);
  spen.set_options(f_outer * 7, (f_outer * 7) / (freq / 4), 5, 75);

  // ������ ������� ������ ������� ���������
  var fc = 2000 * math.sqrt(freq);
  spen.set_filter(fc, (fc * 2) / 3);

  // ���������� �������� �� ����������.
  // 1 - �������,
  // 2 - ���,
  // 3 - ������� �����,
  // 4 - ����� ����������, ��������� ����,
  // freq - ������� ��������,
  // [�����] - ������ ������� ������ ��������.

  for (i = 1; i <= 3; i++) ausp.harms[0].add(i * f_outer, 1, 1, 0);
  for (i = 1; i <= 3; i++) spen.harms[0].add(i * f_outer, 1, 1, 0);

  ausp.harms[0].set_decay(-0.01);
  spen.harms[0].set_decay(-0.01);

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
  var cnt_harms_ausp = ausp.get_cnt_harms(0, 1, 1);
  console.log("AUSP harms count: " + cnt_harms_ausp);

  var cnt_harms_spen = spen.get_cnt_harms(0, 1, 1);
  console.log("SPEN harms count: " + cnt_harms_spen);

  if (
    cnt_harms_ausp >= 1 &&
    cnt_harms_ausp <= 3 &&
    ausp.is_harms_decay(0) &&
    cnt_harms_spen >= 1 &&
    cnt_harms_spen <= 3 &&
    spen.is_harms_decay(0)
  ) {
    // ���������� ������ ������������� �������
    // true - ������ ���������
    // false - ������ �� ���������
    is_defect = true;
  } else if (
    (cnt_harms_ausp >= 1 && cnt_harms_ausp <= 3) ||
    (cnt_harms_spen >= 1 && cnt_harms_spen <= 3)
  ) {
    is_defect = true;
    comment = "��������� ���������"; //�������� �����������
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
