import con from "./connection.js";

export async function login(credenciais) {
  const comando = `
        select ds_usuario     as usuario,
               ds_senha     as senha
          from tb_login
         where ds_usuario = ?
           and ds_senha = ?
    `;

  const [registros] = await con.query(comando, [
    credenciais.usuario,
    credenciais.senha,
  ]);
  return registros[0];

  if (registros.length === 0) {
    throw new Error("Credenciais inválidas");
  }

  return registros[0];
}
