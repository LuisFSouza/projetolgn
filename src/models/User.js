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

/**
 * Inserir um usuario no banco de dados
 * @param {object} user O user deve estar no seguinte formato:
 * {email: <string>, password: <string>}
 * @returns {object} Mensagem de sucesso ou de erro
 */
function save(user){
  return db.insert(user).into('users')
  .then( _ => { 
    return { tipo: "sucesso", corpo: "Dados inseridos com sucesso!" }
  })
  .catch(erro => {
    return { tipo: "erro", corpo: "Erro: " + erro }
  })
}



module.exports =
{
  selectUsers,
  save
}
  