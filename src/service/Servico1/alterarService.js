import { alterar } from "../../repository/servico1Respository.js";

export default async function alterarService(id, pessoa) {
  let linhasAfetadas = await alterar(id, pessoa);
  return linhasAfetadas;
}
