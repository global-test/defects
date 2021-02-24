function get_name() {
  return name;
}

function std_log_init() {
  console.log("init: " + get_name());
}

function std_log_display() {
  console.log(
    'display: имя дефекта = "' +
      get_name() +
      '", имя сигнала = "' +
      signal.get_name() +
      '", на магните = "' +
      signal.is_magnetic() +
      '", Fвр = ' +
      freq +
      " Гц"
  );
}

function std_log_diagnostic(is_defect, comment) {
  console.log(
    'display: имя дефекта = "' +
      get_name() +
      '", имя сигнала = "' +
      signal.get_name() +
      '", на магните = "' +
      signal.is_magnetic() +
      '", Fвр = ' +
      freq +
      ' Гц, наличие дефекта = "' +
      is_defect +
      '", комментарий = "' +
      comment +
      '"'
  );
}

function XOR(b1, b2) {
  return (b1 && !b2) || (!b1 && b2);
}
