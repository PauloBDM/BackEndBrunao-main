import { listar } from "../../repository/servico2Repository.js";

export default async function consultarCliente() {
  let registros = await listar();
  return registros;
}
