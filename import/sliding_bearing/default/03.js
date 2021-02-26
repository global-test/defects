import "service.js";

function default_init() {
  //������� �������������
  set_name("������� ����� ���������");

  // ������� ����� �������
  add_color(0xffd5ff00, "alpha");

  ausp.set_slopes_count(1);
  spen.set_slopes_count(1);

  ausp.set_color(0xff175e15);
  spen.set_color(0xff175e15);

  std_log_init();
}

function default_display(f) {
  //������� �����������
  ausp.set_options(f * 20, 20 * 3, 5, 15); //������ ��������� �������
  spen.set_options(f * 20, 20 * 3, 5, 25);

  var fc = 2000 * math.sqrt(f);
  spen.set_filter(fc, (fc * 2) / 3); //������ ������� ������ ������ ���������

  // ������ ��������� �������.
  // ������ ��� ��������� - ��������� ��������,
  // ������ - ������ �����
  ausp.slopes[0].set(0, f / 2, 0);
  spen.slopes[0].set(0, f / 2, 0);

  std_log_display();
}

function default_diagnostic() {
  //������� �����������
  var is_defect = false; //������������� ����������, ���������� ��������� �����������
  var comment = "";

  //��������� �������. �������� - ������ ���������
  var slope_ausp = ausp.get_slope(0);
  var slope_spen = spen.get_slope(0);

  if (slope_ausp > 0.4 && slope_spen > 0.2) {
    is_defect = true; //������ ���������
  } else if (slope_spen > 0.2) {
    is_defect = true;
    comment = "��������� ���������"; //�������� �����������
  }

  return_result(is_defect, 1, comment);
  std_log_diagnostic(is_defect, comment);
}
