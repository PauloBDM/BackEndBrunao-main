import Servico1 from "./controller/Servico1Controller.js";
import Servico2 from "./controller/Servico2Controller.js";
import login from "./controller/loginController.js";

export default function adicionarRotas(servidor) {
  servidor.use(login);
  servidor.use(Servico1);
  servidor.use(Servico2);
}
