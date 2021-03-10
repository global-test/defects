import "service.js";
import "gear_transmission.js";

function init() {
  // ������� �������������

  // ������� ����� �������
  set_name("������� ����������");

  // ���������� ����������. ������ �������� - ����, ������ - �����
  // add_color(0xffff00ff, "F��1");
  // add_color(0xff0000ff, "F��2");
  add_color(0xff00fffb, "Fz");

  // ������ ����� ��������
  ausp.set_color(0xffff9900);
  spen.set_color(0xffff9900);

  // ������ ���-�� ������� �������� ��� ��������
  ausp.set_harms_series_count(1);
  spen.set_harms_series_count(1);

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

  ausp.set_options(fz(f) * 4, (fz(f) * 4) / (fz(f) / 15), 5, 25);
  spen.set_options(fz(f) * 4, (fz(f) * 4) / (fz(f) / 15), 5, 75);

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

  for (i = 1; i <= 3; i++) ausp.harms[0].add(i * fz(f), 1, 1, 0);
  for (i = 1; i <= 3; i++) spen.harms[0].add(i * fz(f), 1, 1, 0);

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
  console.log("AUSP harms count (fz): " + cnt_harms_ausp);

  var cnt_harms_spen = spen.get_cnt_harms(0, 1, 1);
  console.log("SPEN harms count (fz): " + cnt_harms_spen);

  if (cnt_harms_ausp >= 1 && cnt_harms_spen >= 1) {
    // ���������� ������ ������������� �������
    // true - ������ ���������
    // false - ������ �� ���������
    is_defect = true;
  } else if (cnt_harms_spen == 1) {
    is_defect = true;
    comment = "��������� ���������"; //�������� �����������
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
