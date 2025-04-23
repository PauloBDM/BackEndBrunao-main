import { listar } from "../../repository/servico1Respository.js";

export default async function consultarService() {
  let registros = await listar();
  return registros;
}
