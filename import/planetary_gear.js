var z1 = get_parameter("z1");
var z2 = get_parameter("z2");

function f2(f) {
  return (0.5 * f * z1) / (z1 + z2);
}

function fsat(f) {
  return (((0.5 * f * z1) / z2) * (z1 + 2 * z2)) / (z1 + z2);
}

function fz(f) {
  return z2 * fsat(f);
}
