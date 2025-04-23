import { alterar } from "../../repository/servico2Repository.js";

export default async function alterarCliente(id, pessoa) {
  let linhasAfetadas = await alterar(id, pessoa);
  return linhasAfetadas;
}
