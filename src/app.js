import "dotenv/config";
import express from "express";
import cors from "cors";

import adicionarRotas from "./rotas.js";

import { autenticar } from "./utils/jwt.js";

const servidor = express();
servidor.use(cors());
servidor.use(express.json());

adicionarRotas(servidor);

servidor.get("/usuario", autenticar, (req, res) => {
  res.send({ mensagem: `Bem-vindo, ${req.user.usuario}!` });
});

servidor.use(express.json());
servidor.use(express.urlencoded({ extended: true }));

const PORTA = process.env.PORT;
servidor.listen(PORTA, () => console.log(`--> API subiu na porta ${PORTA}`));
