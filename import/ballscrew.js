var d_inner = object.get_parameter("internalD");
var d_outer = object.get_parameter("outerD");
var d_roller = object.get_parameter("rollerD");
var angle = object.get_parameter("angle");
var d_cage = (d_inner + d_outer) / 2.0;
var z = object.get_parameter("rollcount");

var f_nut = 0.5 * freq * (1.0 - d_roller * math.cos(angle) / d_cage) * z;
