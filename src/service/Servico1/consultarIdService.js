import { listarPorId } from "../../repository/servico1Respository.js";

export default async function consultarIdService(id) {
  let registros = await listarPorId(id);
  return registros;
}
