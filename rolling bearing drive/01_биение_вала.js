import "rolling_bearing/default/01.js";

function init() {
  console.log(1);
  console.log(parent.get_type());
  console.log(2);

  default_init();
}

function display() {
  console.log(1);
  console.log(parent.get_type());
  console.log(2);

  default_display(freq);
}

function diagnostic() {
  default_diagnostic();
}
