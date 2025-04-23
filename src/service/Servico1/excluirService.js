import { excluir } from "../../repository/servico1Respository.js";
import excluirValidation from "../../validation/excluirValidation.js"; // Ajuste o caminho se necessário

export default async function excluirService(id) {
  excluirValidation(id);
  const linhasAfetadas = await excluir(id);

  if (linhasAfetadas === 0) {
    throw new Error("Nenhum serviço encontrado com o ID fornecido.");
  }

  return linhasAfetadas;
}
