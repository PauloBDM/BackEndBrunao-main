import alterarService from "../service/Servico1/alterarService.js";
import consultarService from "../service/Servico1/consultarService.js";
import consultarIdService from "../service/Servico1/consultarIdService.js";
import excluirService from "../service/Servico1/excluirService.js";
import inserirService from "../service/Servico1/inserirService.js";

import { Router } from "express";

const endpoints = Router();

endpoints.delete("/excluir-servico/:id", async (req, resp) => {
  try {
    let id = req.params.id;

    if (!id || isNaN(id)) {
      return resp.status(400).send({
        erro: "ID inválido fornecido.",
      });
    }

    let linhasAfetadas = await excluirService(id);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.post("/cadastrar-servico", async (req, resp) => {
  try {
    let pessoa = req.body;

    let id = await inserirService(pessoa);

    resp.send({
      novoId: id,
    });
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.get("/consultar-servico", async (req, resp) => {
  try {
    let registros = await consultarService();

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

endpoints.get("/consultar-servico/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    let registros = await consultarIdService(id);

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

endpoints.put("/alterar-servico/:id", async (req, resp) => {
  try {
    let id = req.params.id;
    let pessoa = req.body;

    let linhasAfetadas = await alterarService(id, pessoa);

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
