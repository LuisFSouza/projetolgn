const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
dotenv.config()

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email:'user1@gmail.com', password: bcrypt.hashSync(process.env.PASS_ADMIN, 10)}
      ]);
    });
};
