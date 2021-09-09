
exports.up = async function(knex) {
  await knex.schema
    .createTable('recipes', table => {
        table.increments('recipe_id');
        table.string('recipe_name')
            .notNullable()
            .unique();
        table.timestamps(true, true);
    })
    .createTable('steps', table => {
        table.increments('step_id');
        table.integer('step_number')
            .notNullable()
            .unsigned();
        table.string('step_instructions').notNullable();
        table.integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('recipe_id')
            .inTable('recipes')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
    .createTable('ingredients', table => {
        table.increments('ingredient_id');
        table.string('ingredient_name')
            .notNullable()
            .unique();
    })
    .createTable('step_ingredients', table => {
        table.increments('instance_id')
        table.string('quantity').notNullable()
        table.integer('ingredient_id')
            .unsigned()
            .notNullable()
            .references('ingredient_id')
            .inTable('ingredients')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.integer('step_id')
            .unsigned()
            .notNullable()
            .references('step_id')
            .inTable('steps')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
};

exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists('step_ingredients')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('recipes')
};
