import { inserir } from "../../repository/servico1Respository.js";

export default async function inserirService(pessoa) {
  let id = await inserir(pessoa);
  return id;
}
