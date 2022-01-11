const dotenv = require('dotenv')
dotenv.config()

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email:'user1', password:process.env.PASS_ADMIN},
      ]);
    });
};
