import "service.js";

function default_init() {
  // ������� �������������

  // ������� ����� �������
  set_name("������ ������");

  // ���������� ����������. ������ �������� - ����, ������ - �����
  add_color(0xffd5ff00, "��");

  // ������ ����� ��������
  ausp_hf.set_color(0xff0091ff);
  spen_hf.set_color(0xff0091ff);

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

  ausp_hf.set_options(10000, 1000, 5, 25);
  spen_hf.set_options(10000, 1000, 5, 75);

  // ������ ������� ������ ������� ���������
  var fc = 2000 * math.sqrt(f);
  spen.set_filter(fc, (fc * 2) / 3);

  ausp_hf.humps[0].set(4000, 10000, 0);
  spen_hf.humps[0].set(4000, 10000, 0);

  std_log_display();
}

function default_diagnostic() {
  //������� �����������

  // ������������� ����������, ���������� ��������� �����������
  var is_defect = false;
  var comment = "";

  var ausp_hump = ausp_hf.get_max_hump(0);
  var spen_hump = spen_hf.get_max_hump(0);

  if (ausp_hump > 3 && spen_hump > 3) {
    // ���������� ������ ������������� �������
    // true - ������ ���������
    // false - ������ �� ���������
    is_defect = true;
  } else if (ausp_hump > 3 || spen_hump > 3) {
    is_defect = true;
    comment = "��������� ���������"; //�������� �����������
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
