function get_name() {
  return name;
}

function std_log_init() {
  console.log("init: " + get_name());
}

function std_log_display() {
  console.log(
    'display: ��� ������� = "' +
      get_name() +
      '", ��� ������� = "' +
      signal.get_name() +
      '", �� ������� = "' +
      signal.is_magnetic() +
      '", F�� = ' +
      freq +
      " ��"
  );
}

function std_log_diagnostic(is_defect, comment) {
  console.log(
    'display: ��� ������� = "' +
      get_name() +
      '", ��� ������� = "' +
      signal.get_name() +
      '", �� ������� = "' +
      signal.is_magnetic() +
      '", F�� = ' +
      freq +
      ' ��, ������� ������� = "' +
      is_defect +
      '", ����������� = "' +
      comment +
      '"'
  );
}

function XOR(b1, b2) {
  return (b1 && !b2) || (!b1 && b2);
}
