import { excluir } from "../../repository/servico2Repository.js";
import excluirValidation from "../../validation/excluirValidation.js";

export default async function excluirCliente(id) {
  excluirValidation(id);
  const linhasAfetadas = await excluir(id);

  if (linhasAfetadas === 0) {
    throw new Error("Nenhum serviço encontrado com o ID fornecido.");
  }

  return linhasAfetadas;
}
