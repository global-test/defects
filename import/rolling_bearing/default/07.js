import "service.js";
import "rolling_bearing/rolling_bearing.js";

function default_init() {
  // ������� �������������

  // ������� ����� �������
  set_name("������ � ������� �� ���������� ������");

  // ���������� ����������. ������ �������� - ����, ������ - �����
  add_color(0xffff00ff, "F��");
  add_color(0xff00fffb, "F�");
  add_color(0xff00fffb, "�F��");

  // ������ ����� ��������
  ausp.set_color(0xfffbff00);
  spen.set_color(0xfffbff00);

  ausp_hf.set_color(0xfffbff00);
  spen_hf.set_color(0xfffbff00);

  // ������ ���-�� ������� �������� ��� ��������
  ausp.set_harms_series_count(2);
  spen.set_harms_series_count(2);

  ausp_hf.set_humps_count(1);
  spen_hf.set_humps_count(1);

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

  ausp.set_options(f_inner(f) * 7, (f_inner(f) * 7) / (f / 5), 5, 25);
  spen.set_options(f_inner(f) * 7, (f_inner(f) * 7) / (f / 5), 5, 75);

  ausp_hf.set_options(10000, 1000, 5, 25);
  spen_hf.set_options(10000, 1000, 5, 75);

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

  for (i = 1; i <= 8; i++) ausp.harms[0].add(i * f, 1, 1, 0);
  for (i = 1; i <= 5; i++) spen.harms[0].add(i * f, 1, 1, 0);

  for (i = 1; i <= 4; i++) ausp.harms[1].add(i * f_inner(f), 1, 1, 1);

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
    spen.harms[1].add_modulated(i * f_inner(f), 1, f, 1, 1, 3, 1, 1, 2);

  // ������ ��������� ������ ������.
  // ������ ��� ��������� - ��������� ��������,
  // ������ - ������ �����.
  ausp_hf.humps[0].set(4000, 10000, 0);
  spen_hf.humps[0].set(4000, 10000, 0);

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
  var cnt_harms_ausp = ausp.get_cnt_harms(1, 1, 1);
  console.log("AUSP harms count: " + cnt_harms_ausp);

  var cnt_harms_spen = spen.get_cnt_harms(1, 1, 1);
  console.log("SPEN harms count: " + cnt_harms_spen);

  var cnt_harms_spen_freq = spen.get_cnt_harms(0, 2, 1);
  console.log("SPEN harms count (freq): " + cnt_harms_spen_freq);

  // ��������� ������������� ����� � ���������.
  // �������� - ������ ���������.
  var ausp_hump = ausp_hf.get_max_hump(0);
  var spen_hump = spen_hf.get_max_hump(0);

  if (signal.is_magnetic()) {
    if (cnt_harms_ausp >= 2 && cnt_harms_spen >= 1) {
      // ���������� ������ ������������� �������
      // true - ������ ���������
      // false - ������ �� ���������
      is_defect = true;
    } else if (cnt_harms_ausp >= 1 && cnt_harms_spen_freq >= 1) {
      is_defect = true;
      comment = "��������� ���������"; //�������� �����������
    }
  } else {
    if (
      cnt_harms_ausp >= 2 &&
      cnt_harms_spen >= 1 &&
      (ausp_hump > 3 || spen_hump > 3)
    ) {
      // ���������� ������ ������������� �������
      // true - ������ ���������
      // false - ������ �� ���������
      is_defect = true;
    } else if (cnt_harms_ausp >= 1 && cnt_harms_spen_freq >= 1) {
      is_defect = true;
      comment = "��������� ���������"; //�������� �����������
    }
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
