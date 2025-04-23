import { listarPorIdCli } from "../../repository/servico2Repository.js";

export default async function consultarIdCliente(id) {
  let registros = await listarPorIdCli(id);
  return registros;
}
