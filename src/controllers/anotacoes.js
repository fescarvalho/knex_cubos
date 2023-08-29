import knex from "../db/conexao.js";

export const createAnotacao = async (req, res) => {
  const { id } = req.params;
  const { nota } = req.body;

  const anotacao = await knex("anotacoes")
    .insert({
      agenda_id: id,
      nota,
    })
    .returning("*");
  return res.status(200).json(anotacao);
};
export const listAnotacoes = async (req, res) => {
  const anotacao = await knex("anotacoes")
    .join("agenda", "anotacoes.agenda_id", "agenda.id")
    .select("anotacoes.*", "agenda.nome");

  return res.status(200).json(anotacao);
};
