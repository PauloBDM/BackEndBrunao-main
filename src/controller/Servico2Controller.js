import { Router } from "express";

import consultarCliente from "../service/Servico2/consultarCliente.js";
import excluirCliente from "../service/Servico2/excluirCliente.js";
import consultarIdCliente from "../service/Servico2/consultarIdCliente.js";
import alterarCliente from "../service/Servico2/alterarCliente.js";
import inserirCliente from "../service/Servico2/inserirCliente.js";

const endpoints = Router();

endpoints.delete("/excluir-cliente/:id", async (req, resp) => {
  try {
    let id = req.params.id;

    if (!id || isNaN(id)) {
      return resp.status(400).send({
        erro: "ID inválido fornecido.",
      });
    }

    let linhasAfetadas = await excluirCliente(id);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.post("/cadastrar-cliente", async (req, resp) => {
  try {
    let pessoa = req.body;

    let id = await inserirCliente(pessoa);

    resp.send({
      novoId: id,
    });
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.get("/consultar-cliente", async (req, resp) => {
  try {
    let registros = await consultarCliente();

    if (registros.length === 0) {
      return resp.status(404).send({ erro: "Nenhum serviço encontrado" });
    }
    resp.send(registros);
  } catch (err) {
    console.error("Erro ao consultar serviços:", err);
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.get("/consultar-cliente/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    let registros = await consultarIdCliente(id);

    if (registros.length === 0) {
      return resp.status(404).send({ erro: "Serviço não encontrado" });
    }

    resp.send(registros);
  } catch (err) {
    console.error("Erro ao consultar serviço:", err);
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.put("/alterar-cliente/:id", async (req, resp) => {
  try {
    let id = req.params.id;
    let pessoa = req.body;

    let linhasAfetadas = await alterarCliente(id, pessoa);

    resp.send({
      linhasAfetadas: linhasAfetadas,
    });
  } catch (err) {
    console.error(err);
    resp.status(400).send({
      erro: err.message,
    });
  }
});

export default endpoints;
