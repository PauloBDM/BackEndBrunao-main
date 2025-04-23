import { inserir } from "../../repository/servico2Repository.js";


export default async function inserirCliente(pessoa) {
  let id = await inserir(pessoa);
  return id;
}
