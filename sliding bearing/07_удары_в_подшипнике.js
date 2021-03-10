import "service.js";

function init() {
  // ������� �������������

  // ������� ����� �������
  set_name("����� � ����������");

  // ���������� ����������. ������ �������� - ����, ������ - �����
  add_color(0xffff00ff, "F��");

  // ������ ����� ��������
  ausp.set_color(0xff66ff00);
  spen.set_color(0xff66ff00);
  ausp_hf.set_color(0xff66ff00);
  spen_hf.set_color(0xff66ff00);

  // ������ ���-�� ������� �������� ��� ��������
  ausp.set_harms_series_count(1);
  spen.set_harms_series_count(1);

  ausp_hf.set_humps_count(1);
  spen_hf.set_humps_count(1);

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

  ausp.set_options(f * 40, 40 * 5, 5, 25);
  spen.set_options(f * 40, 40 * 5, 5, 75);

  ausp_hf.set_options(10000, 1000, 5, 25);
  spen_hf.set_options(10000, 1000, 5, 75);

  // ������ ������� ������ ������� ���������
  var fc = 2000 * math.sqrt(f);
  spen.set_filter(fc, (fc * 2) / 3);

  ausp_hf.humps[0].set(4000, 10000, 0);
  spen_hf.humps[0].set(4000, 10000, 0);

  for (i = 1; i <= 10; i++) ausp.harms[0].add(i * f, 1, 1, 0);
  for (i = 1; i <= 6; i++) spen.harms[0].add(i * f, 1, 1, 0);

  std_log_display();
}

function diagnostic() {
  //������� �����������

  // ������������� ����������, ���������� ��������� �����������
  var is_defect = false;
  var comment = "";

  var ausp_hump = ausp_hf.get_max_hump(0);
  var spen_hump = spen_hf.get_max_hump(0);

  var cnt_harms_ausp = ausp.get_cnt_harms(0, 2, 1);
  console.log("AUSP harms count: " + cnt_harms_ausp);

  var cnt_harms_spen = spen.get_cnt_harms(0, 2, 1);
  console.log("SPEN harms count: " + cnt_harms_spen);

  if (signal.is_magnetic()) {
    if (cnt_harms_ausp >= 3 && cnt_harms_spen >= 3 && cnt_harms_spen <= 6) {
      // ���������� ������ ������������� �������
      // true - ������ ���������
      // false - ������ �� ���������
      is_defect = true;
    }
  } else {
    if (
      cnt_harms_ausp >= 3 &&
      cnt_harms_spen >= 3 &&
      cnt_harms_spen <= 6 &&
      (ausp_hump > 3 || spen_hump > 3)
    ) {
      // ���������� ������ ������������� �������
      // true - ������ ���������
      // false - ������ �� ���������
      is_defect = true;
    }
  }
  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
