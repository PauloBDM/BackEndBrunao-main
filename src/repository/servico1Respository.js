import con from "./connection.js";

export async function inserir(pessoa) {
  const comando = `           
        INSERT INTO tb_servico (fk_id_cli, ds_endereco, vlr_servico, dt_estimada, ds_servico) 
        VALUES (?, ?, ?, ?, ?)
    `;

  let [info] = await con.query(comando, [
    pessoa.fk_id_cli, // fk_id_cli
    pessoa.ds_endereco, // ds_endereco
    pessoa.vlr_servico, // vlr_servico
    pessoa.dt_estimada, // dt_estimada
    pessoa.ds_servico, // ds_servico
  ]);

  return info.insertId;
}
export async function excluir(id) {
  const comando = `
        DELETE FROM tb_servico
        WHERE id_servico = ?
    `;
  let [info] = await con.query(comando, [id]);
  return info.affectedRows;
}

export async function listar() {
  const comando = `SELECT * FROM tb_servico;`;
  let [registros] = await con.query(comando);
  return registros;
}

export async function listarPorId(id) {
  if (!id) {
    throw new Error("ID do serviço deve ser fornecido.");
  }

  const comando = `SELECT * FROM tb_servico WHERE id_servico = ?;`;
  let [registros] = await con.query(comando, [id]);

  return registros;
}
export async function alterar(id, pessoa) {
  // Verifica se o ID existe na tabela
  const verificaComando = `
        SELECT COUNT(*) AS total FROM tb_servico WHERE id_servico = ?;
    `;
  let [resultado] = await con.query(verificaComando, [id]);

  if (resultado[0].total === 0) {
    throw new Error("ID do serviço não encontrado.");
  }
  const comando = `
        UPDATE tb_servico
        SET   
            ds_endereco = ?, 
            vlr_servico = ?, 
            dt_estimada = ?, 
            ds_servico = ?
        WHERE id_servico = ?;
    `;

  let [info] = await con.query(comando, [
    pessoa.ds_endereco,
    pessoa.vlr_servico,
    pessoa.dt_estimada,
    pessoa.ds_servico,
    id,
  ]);

  return info.affectedRows;
}
