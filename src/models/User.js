const db = require('../database/index')


/**
 * Seleciona todos os usuarios cadastrados
 * @returns {object} Objeto com todos os usuarios cadastrados ou
 * uma mensagem de erro
 */
function selectUsers(){
    return db.select('*').from('users')
    .then(users => { return users })
    .catch(erro => {
      return { tipo: "erro", corpo: "Erro: " + erro }
    })
}

module.exports =
{
  selectUsers

}
  