import http from "../http";
import { decodeProductOutput } from "./decoder";

/**
 * Esta función asincrónica, 'getProducts', se encarga de obtener la lista de productos desde la APi the Garage.
 * @returns {Promise} Una promesa que se resolverá con la lista de productos o se rechazará con la respuesta de error para darle un manejo de error visual.
 */

export async function getProducts() {
  try {
    const { data: response } = await http.get(`/productos/`);
    const data = await Promise.all(
      response.data.map((elemento) => {
        decodeProductOutput(elemento);
      })
    );

    // const data = response.data;
    //falta hacer la transformación de los datos, osea el map

    return { data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
}

/**
 * Esta función asincrónica, 'getProduct', se encarga de obtener un producto desde la APi the Garage.
 * @param {number} params.id - El id del producto a obtener.
 * @returns {Promise} Una promesa que se resolverá con el producto o se rechazará con la respuesta de error para darle un manejo de error visual.
 *
 */

export async function getProduct({ id }) {
  try {
    const { data: response } = await http.get(`/productos/${id}`);
    const data = response.data;

    return { data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
}

/**
 * Esta funcion asincrónica, 'createProduct', se encarga de crear un producto en la API de The Garage.
 * @param {object} payload - El payload que se enviará al crear el producto.
 * @returns {Promise} Una promesa que se resolverá con el producto creado o se rechazará con la respuesta de error para darle un manejo de error visual.
 *
 */

export async function createProduct(payload) {
  try {
    const { data: response } = await http.post(`/productos/`, {
      ...payload,
      id_empresa: "89379827348jsjhsjdn",
    });
    // const { data: response } = await axios.post(
    //   `${import.meta.env.VITE_API_URL}/productos`,
    //   payload
    // );
    const data = response.data;
    return { data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error.message);
  }
}
