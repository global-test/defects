import "service.js";

function init() {
  // ������� �������������

  // ������� ����� �������
  set_name("������������������ ������");

  // ���������� ����������. ������ �������� - ����, ������ - �����
  add_color(0xffff00ff, "F��");

  // ������ ����� ��������
  ausp.set_color(0xff66ff00);
  spen.set_color(0xff66ff00);

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

  ausp.set_options(freq * 40, 40 * 5, 5, 25);
  spen.set_options(freq * 40, 40 * 5, 5, 75);

  // ������ ������� ������ ������ ���������
  var fc = 2000 * math.sqrt(freq);
  spen.set_filter(fc, (fc * 2) / 3);

  // ���������� �������� �� ����������.
  // 1 - �������,
  // 2 - ���,
  // 3 - ������� �����,
  // 4 - ����� ����������, ��������� ����,
  // freq - ������� ��������,
  // [�����] - ������ ������� ������ ��������.

  for (i = 1; i <= 1; i++) ausp.harms[0].add(i * freq, 1, 1, 0);
  for (i = 1; i <= 2; i++) spen.harms[0].add(i * freq, 1, 1, 0);

  spen.harms[0].set_decay(-0.05);

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

  var is_decay = spen.is_harms_decay(0);

  if (cnt_harms_ausp == 1 && cnt_harms_spen >= 1 && is_decay) {
    // ���������� ������ ������������� �������
    // true - ������ ���������
    // false - ������ �� ���������
    is_defect = true;
  } else if (XOR(cnt_harms_ausp == 1, cnt_harms_spen == 1)) {
    is_defect = true;
    comment = "��������� ���������"; //�������� �����������
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
