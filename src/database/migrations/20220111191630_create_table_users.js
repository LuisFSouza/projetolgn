exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments('id')
        table.text('email').unique().notNullable()
        table.text('password').notNullable()
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
