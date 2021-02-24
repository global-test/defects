var d_inner = get_parameter("internalD");
var d_outer = get_parameter("outerD");
var d_roller = get_parameter("rollerD");
var angle = get_parameter("angle");
var d_cage = (d_inner + d_outer) / 2;
var z = get_parameter("rollcount");

var f_separ = (freq * (1 - d_roller / d_cage) * math.cos(angle)) / 2; // частота сепаратора

var f_outer = f_separ * z; // частота наружного кольца

var f_inner = (freq - f_separ) * z;

var f_tk =
  ((0.5 * freq * d_cage) / d_roller) *
  (1 - ((d_roller * d_roller) / (d_cage * d_cage)) * math.cos(angle));
