import { instance as http } from '../http';

export const updatePassword = async (password, newPassword) => {
  await http.put('/perfil/cambiarcontrasena', {
    password,
    newPassword,
  });
};
