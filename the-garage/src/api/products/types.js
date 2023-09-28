import { z } from "zod";
//import { UserOutput } from "../users/types";
//aqui debo importar el esquemas de la empresa sueña de ese producto que viene en el resutado de productos

export const ProductOuput = z
  .object({
    id: z.string(),
    id_empresa: z.string(),
    //id_categoria: z.string(),
    nombre: z.string(),
    descripcion: z.string(),
    ficha_tecnica: z.string(),
    precio: z.number(),
    cantidad_disponible: z.number(),
    estatus: z.boolean(),
    tipo_entrega: z.string(),
    fecha_creacion: z.string(),
    fecha_actualizacion: z.string(),
    marca: z.string(),
    impuestos: z.string(),
    // me falta fotos, valoraciones,
  })
  .merge(z.unknown()); //para que acepte propiedades adicionales mientras valido lo demas

// const schema = z.object({
//   name: z.string(),
// }).merge(z.unknown());

// const data = {
//   name: "John",
//   age: 30, // Propiedad adicional
// };

// schema.parse(data); // No generará un error, 'age' se admite sin restricciones
