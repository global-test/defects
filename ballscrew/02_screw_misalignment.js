import "service.js";

function init() {
  // ������� �������������

  // ������� ����� �������
  set_name("������� ����� (02_screw_mesalignment.js)");

  // ���������� ����������. ������ �������� - ����, ������ - �����
  add_color(0xff00ff00, "F���");

  // ������ ����� ��������
  ausp.set_color(0xffffff00);
  spen.set_color(0xff00ffff);

  // ������ ���-�� ������� �������� ��� ��������
  spen.set_harms_series_count(2);
  ausp.set_harms_series_count(2);

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

  ausp.set_options(1000, 1000, 5, 15);
  spen.set_options(1000, 1000, 5, 25);

  var fc = 2000 * math.sqrt(freq);
  spen.set_filter(fc, (fc * 2) / 3);

  // ���������� �������� �� ����������.
  // 1 - �������,
  // 2 - �������� �����,
  // 3 - ����� ����������, ��������� ����,
  // freq - ������� ��������,
  // [�����] - ������ ������� ������ ��������.

  for (i = 1; i <= 11; i++) {
    ausp.harms[(i + 1) % 2].add(i * freq, 1, ((i + 1) % 2) * 2 + 1, 0); //���������� �������� �� ����������. ������ �������� - �������, ������ - ���, ������ �������� �����, ��������� - ����� ����������, ��������� ����.
    spen.harms[(i + 1) % 2].add(i * freq, 1, ((i + 1) % 2) * 2 + 1, 0); //
  }

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
  var cnt_harms_ausp = ausp.get_cnt_harms(0, 1, 2);
  console.log("AUSP harms count: " + cnt_harms_ausp);

  var cnt_harms_spen = spen.get_cnt_harms(0, 1, 2);
  console.log("SPEN harms count: " + cnt_harms_spen);

  if (
    cnt_harms_ausp >= 3 &&
    cnt_harms_ausp <= 7 &&
    cnt_harms_spen >= 3 &&
    cnt_harms_spen <= 9
  ) {
    // ���������� ������ ������������� �������
    // true - ������ ���������
    // false - ������ �� ���������
    is_defect = true;
  } else if (
    cnt_harms_ausp >= 1 &&
    cnt_harms_ausp <= 2 &&
    cnt_harms_spen >= 1 &&
    cnt_harms_spen <= 2
  ) {
    is_defect = true;
    comment = "��������� ���������"; //�������� �����������
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}

function display() {
  //������� �����������
}

function diagnostic() {
  //������� �����������
  var is_defect = false; //������������� ����������, ���������� ��������� �����������
  var comment = "";

  var cnt_harms_ausp = ausp.get_cnt_harms(1, 1, 1); //��������� ���-�� �������� �������������� �� �����������. 1-�������� � ����� ����, ������ - ���������� ���-�� ������������ � ����.
  var cnt_harms_spen = spen.get_cnt_harms(1, 1, 1);

  if (cnt_harms_ausp >= 1 && cnt_harms_spen >= 1) {
    //���������� ������ ������������� �������
    is_defect = true; //������ ���������
  } else if (cnt_harms_ausp == 1 || cnt_harms_spen == 1) {
    is_defect = true;
    comment = "��������� ���������"; //�������� �����������
  }

  return_result(is_defect, 1, comment);
}
