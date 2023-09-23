export function promedioValoraciones(valoraciones) {
  let suma = 0;
  if (valoraciones.length === 0) return 0;
  valoraciones.forEach((valoracion) => {
    suma += valoracion.calificacion;
  });
  return Math.round(suma / valoraciones.length);
}
