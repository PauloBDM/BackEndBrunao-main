import con from "./connection.js";

export async function inserir(pessoa) {
  const comando = `           
        insert into tb_cliente (ds_nome, ds_num_cli, ds_email_cli, ds_comentario) 
        values (?, ?, ?, ?)
    `;

  let [info] = await con.query(comando, [
    pessoa.ds_nome,
    pessoa.ds_num_cli,
    pessoa.ds_email_cli,
    pessoa.ds_comentario,
  ]);

  return info.insertId;
}
export async function excluir(id) {
  const comando = `
        DELETE FROM tb_cliente
        WHERE id_cli = ?
    `;
  let [info] = await con.query(comando, [id]);
  return info.affectedRows;
}

export async function listar() {
  const comando = `SELECT * FROM tb_cliente;`;
  let [registros] = await con.query(comando);
  return registros;
}

export async function listarPorIdCli(id) {
  if (!id) {
    throw new Error("ID do serviço deve ser fornecido.");
  }

  const comando = `SELECT * FROM tb_cliente WHERE id_cli = ?;`;
  let [registros] = await con.query(comando, [id]);

  return registros;
}
export async function alterar(id, pessoa) {
  const comando = `
        UPDATE tb_cliente
        SET  
            ds_nome = ?, 
            ds_num_cli = ?, 
            ds_email_cli = ?, 
            ds_comentario = ? 
        WHERE id_cli = ?;
    `;

  let [info] = await con.query(comando, [
    pessoa.ds_nome,
    pessoa.ds_num_cli,
    pessoa.ds_email_cli,
    pessoa.ds_comentario,
    id,
  ]);

  if (info.affectedRows === 0) {
    throw new Error("ID do cliente não encontrado.");
  }

  return info.affectedRows;
}
