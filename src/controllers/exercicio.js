import knex from "../db/conexao.js";

export const listarUsuarios = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await knex("usuarios").where({ id }).first();
    if (!user) return res.status(400).json({ message: "Usuario não encontrado." });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(200).json(err);
  }
};

export const criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome) return res.status(400).json({ message: "Nome é obrigatório." });
  if (!email) return res.status(400).json({ message: "Email é obrigatório." });
  if (!senha) return res.status(400).json({ message: "Senha é obrigatório." });

  try {
    const newUser = await knex("usuarios").insert({ nome, email, senha }).returning("*");
    if (newUser.length === 0)
      return res.status(400).json({ message: "Não foi possivel cadastrar o usuario." });
    return res.status(200).json(newUser[0]);
  } catch (error) {
    return res.status(200).json(error);
  }
};

export const attUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.params;
  try {
    const userExists = await knex("usuarios").where({ id }).first();

    if (!userExists) return res.status(400).json({ message: "Usuario não existe." });

    await knex("usuarios")
      .update({ nome, email, senha })
      .where({ id })
      .returning(["nome", "email"]);

    return res.status(200).json({ message: "Usuario atualizado com sucesso." });
  } catch (error) {
    return res.status(200).json(error);
  }
};
export const deleteUsario = async (req, res) => {
  const { id } = req.params;
  try {
    const userExists = await knex("usuarios").where({ id }).first();

    if (!userExists) return res.status(400).json({ message: "Usuario não existe." });

    const deletUser = await knex("usuarios").del().where({ id });

    if (!deletUser)
      return res.status(400).json({ message: "Não foi possivel deletar o usuario." });

    return res.status(200).json("Usuario deletado com successo.");
  } catch (error) {
    return res.status(200).json(error);
  }
};
