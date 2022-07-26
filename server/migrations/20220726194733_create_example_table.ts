import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('example', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('name').notNullable();
    table.integer('value').notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('example');
}

