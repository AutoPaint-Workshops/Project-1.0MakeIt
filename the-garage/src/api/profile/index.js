import { instance as http } from '../http';
import { decodeClientUpdate, decodeCompanyUpdate } from './decoder';

export const updatePassword = async (password, newPassword) => {
  await http.put('/perfil/cambiarcontrasena', {
    password,
    newPassword,
  });
};

export const updateClientProfile = async (profile) => {
  const body = {
    userData: {
      ciudad: profile.ciudad,
      departamento: profile.departamento,
      direccion: profile.direccion,
    },
    userTypeData: {
      nombre_completo: profile.nombre_completo,
      telefono: profile.telefono,
    },
  };
  const form = new FormData();
  form.append('data', JSON.stringify(body));
  const { data } = await http.put('/perfil', form);

  const decoded = await decodeClientUpdate(data);
  return decoded;
};

export const updateCompanyProfile = async (profile) => {
  const body = {
    userData: {
      ciudad: profile.ciudad,
      departamento: profile.departamento,
      direccion: profile.direccion,
    },
    userTypeData: {
      telefono: profile.telefono,
    },
  };
  const form = new FormData();
  form.append('data', JSON.stringify(body));
  const { data } = await http.put('/perfil', form);
  const decoded = await decodeCompanyUpdate(data);
  return decoded;
};
