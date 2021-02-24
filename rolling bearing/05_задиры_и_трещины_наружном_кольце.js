import "service.js";
import "rolling_bearing.js";

function init() {
  // ������� �������������

  // ������� ����� �������
  set_name("������ � ������� �� �������� ������");

  // ���������� ����������. ������ �������� - ����, ������ - �����
  add_color(0xff004dff, "F�");
  add_color(0xff004dff, "�F��");

  // ������ ����� ��������
  ausp.set_color(0xffff0867);
  spen.set_color(0xffff0867);

  ausp_hf.set_color(0xffff0867);
  spen_hf.set_color(0xffff0867);

  // ������ ���-�� ������� �������� ��� ��������
  ausp.set_harms_series_count(1);
  spen.set_harms_series_count(1);

  ausp_hf.set_humps_count(1);
  spen_hf.set_humps_count(1);

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

  ausp_hf.set_options(10000, 1000, 5, 25);
  spen_hf.set_options(10000, 1000, 5, 75);

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
  for (i = 1; i <= 4; i++) ausp.harms[0].add(i * f_outer, 1, 1, 0);

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
  for (i = 1; i <= 4; i++)
    spen.harms[0].add_modulated(i * f_outer, 1, freq, 1, 1, 3, 0, 1, 1);

  // ������ ��������� ������ ������.
  // ������ ��� ��������� - ��������� ��������,
  // ������ - ������ �����.

  ausp_hf.humps[0].set(4000, 10000, 0);
  spen_hf.humps[0].set(4000, 10000, 0);

  ausp.harms[0].set_decay(0.005);
  spen.harms[0].set_decay(0.005);

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
  var cnt_harms_ausp = ausp.get_cnt_harms(0, 1, 0);
  console.log("AUSP harms count: " + cnt_harms_ausp);

  var cnt_harms_spen = spen.get_cnt_harms(0, 1, 0);
  console.log("SPEN harms count: " + cnt_harms_spen);

  // ��������� ������������� ����� � ���������.
  // �������� - ������ ���������.
  var ausp_hump = ausp_hf.get_max_hump(0);
  var spen_hump = spen_hf.get_max_hump(0);

  if (signal.is_magnetic()) {
    if (cnt_harms_ausp >= 2 && cnt_harms_spen >= 2) {
      // ���������� ������ ������������� �������
      // true - ������ ���������
      // false - ������ �� ���������
      is_defect = true;
    } else if (cnt_harms_ausp >= 2 || cnt_harms_spen >= 2) {
      is_defect = true;
      comment = "��������� ���������"; //�������� �����������
    }
  } else {
    if (
      cnt_harms_ausp >= 2 &&
      cnt_harms_spen >= 2 &&
      (ausp_hump > 3 || spen_hump > 3)
    ) {
      // ���������� ������ ������������� �������
      // true - ������ ���������
      // false - ������ �� ���������
      is_defect = true;
    } else if (cnt_harms_ausp >= 2 || cnt_harms_spen >= 2) {
      is_defect = true;
      comment = "��������� ���������"; //�������� �����������
    }
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
