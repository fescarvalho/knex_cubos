import knex from "../db/conexao.js";

export const list = async (req, res) => {
  const farmacia = await knex("farmacia").select().count();
  const farmaciaNovo = await knex("usuarios").min("idade");
  const farmaciaNotNullAndSum = await knex("farmacia")
    .select("categoria")
    .sum("estoque")
    .whereNotNull("categoria")
    .groupBy("categoria");

  const farmaciaSumMedNull = await knex("farmacia").whereNull("categoria").count();
  const farmaciaCatQntCatNotNull = await knex("farmacia")
    .select("categoria")
    .count("medicamento")
    .whereNotNull("categoria")
    .groupBy("categoria");
  const userIdadeQtnIdade = await knex("usuarios")
    .select("idade")
    .count()
    .where("idade", ">=", 18)
    .groupBy("idade");

  const anotacoes = await knex("agenda").select();

  return res.status(200).json(anotacoes);
};
export const insertUser = async (req, res) => {
  const users = [
    {
      nome: "Lucas C.",
      email: "lucas@teste.com",
      telefone: "(99) 99999-9999",
    },
    {
      nome: "Joao S.",
      email: "joao@teste.com",
      telefone: "(99) 99999-9999",
    },
    {
      nome: "Joao S.",
      email: "joao@teste.com",
      telefone: "(99) 99999-9999",
    },
  ];

  const agenda = await knex("agenda").insert(users).returning("*");
  return res.status(200).json(agenda);
};
export const updateUser = async (req, res) => {
  const { nome, email, telefone } = req.body;
  const { id } = req.params;

  const agenda = await knex("agenda")
    .update({ nome, email, telefone })
    .where({ id })
    .returning("*");

  return res.status(200).json(agenda);
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const agenda = await knex("agenda").del().where({ id }).returning("*");

  return res.status(200).json(agenda);
};
