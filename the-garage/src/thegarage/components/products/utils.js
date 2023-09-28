import { ERRORS } from "./conts";

export function promedioValoraciones(valoraciones) {
  let suma = 0;
  if (valoraciones.length === 0) return 0;
  valoraciones.forEach((valoracion) => {
    suma += valoracion.calificacion;
  });
  return Math.round(suma / valoraciones.length);
}

export function generarQueryFiltros(filtros) {
  let query = "";
  let categorias = filtros.category;
  let marcas = filtros.brand;
  const precios = filtros.price;
  const calificaciones = filtros.rating;
  let empresas = filtros.store;

  if (categorias !== undefined) {
    categorias = reemplazarEspacios(categorias);
    query += `filterCategorias=${categorias}&`;
  }
  if (marcas !== undefined) {
    marcas = reemplazarEspacios(marcas);
    query += `filterMarcas=${marcas}&`;
  }

  if (query.endsWith("&")) {
    query = query.slice(0, -1);
  }

  return query;
}

const reemplazarEspacios = (texto) => {
  return texto.replace(/ /g, "%20");
};

export function objetoEstaVacio(obj) {
  for (let key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      return false; // Si encuentra al menos una propiedad, el objeto no está vacío
    }
  }
  return true; // Si no encuentra ninguna propiedad, el objeto está vacío
}

// function to format error messages
export function formatError(e) {
  if (e.name === "ZodError") {
    return ERRORS.DECODE;
  }
  if (typeof e === "string") {
    return e;
  }
  if (e instanceof Error || e.message) {
    return e.message;
  }
}
