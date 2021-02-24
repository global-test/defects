var d_inner = get_parameter("internalD");
var d_outer = get_parameter("outerD");
var d_roller = get_parameter("rollerD");
var angle = get_parameter("angle");
var d_cage = (d_inner + d_outer) / 2;
var z = get_parameter("rollcount");

var f_nut = 0.5 * freq * (1.0 - (d_roller * math.cos(angle)) / d_cage) * z; // частота гайки - Fгк

var f_vnt = 0.5 * freq * (1.0 + (d_roller * math.cos(angle)) / d_cage) * z; // частота винта - Fвнт

var f_cage = 0.5 * freq * (1.0 - (d_roller / d_cage) * math.cos(angle)); // частота сепаратора - Fcage

var f_tk =
  ((0.5 * freq * d_cage) / d_roller) *
  (1.0 -
    ((d_roller * d_roller) / (d_cage * d_cage)) *
      (math.cos(angle) * math.cos(angle)));
