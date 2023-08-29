import express from "express";
import { list, insertUser, updateUser, deleteUser } from "../controllers/controller.js";
import { createAnotacao, listAnotacoes } from "../controllers/anotacoes.js";
import {
  criarUsuario,
  attUsuario,
  deleteUsario,
  listarUsuarios,
} from "../controllers/exercicio.js";

const routes = express();

routes.get("/", list);
routes.get("/insert", insertUser);
routes.put("/insert/:id", updateUser);
routes.delete("/insert/:id", deleteUser);

/* ---------- */
routes.get("/list_user/:id", listarUsuarios);
routes.get("/insert_user", criarUsuario);
routes.put("/edit_user/:id", attUsuario);
routes.delete("/delete_user/:id", deleteUsario);

/* ---------- */
routes.get("/anotacoes", listAnotacoes);
routes.post("/:id/anotacoes", createAnotacao);
routes.put("/edit_user/:id", attUsuario);
routes.delete("/delete_user/:id", deleteUsario);

export default routes;
