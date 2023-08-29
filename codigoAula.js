const agendaWhere = await knex("agenda").where({ id: 5 }).first();
const agendaNotNull = await knex("agenda").whereNotNull("email");
const agendaBetween = await knex("agenda").whereBetween("id", [5, 10]);
const agendaBetweenOrderBy = await knex("agenda")
  .whereBetween("id", [5, 10])
  .orderBy("id", "desc");
const agendaDistinct = await knex("agenda").distinct("email", "nome");
const agendaGrupByAndCount = await knex("agenda")
  .select("email")
  .groupBy("email")
  .count();
const agendaLimit = await knex("agenda").select().limit(5).offset(2);
const agendaCount = await knex("agenda").whereNotNull("email").count();
const agendaSum = await knex("agenda").whereNull("email").sum("id");
const agendaAVG = await knex("agenda").whereNull("email").avg("id");
const agendaMin = await knex("agenda").whereNull("email").min("id");
const agendaMax = await knex("agenda").whereNull("email").max("id");
