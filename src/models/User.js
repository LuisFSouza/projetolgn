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

/**
 * Altera um usuario no banco de dados
 * @param {object} user  O usuario deve estar no seguinte formato:
 * {email: <string>, password: <string>}
 * @param {int} id ID do usuario
 * @returns {object} Mensagem de sucesso ou de erro
 */
 function edit(user, id){
  return db('users').where('id', id).update(user)
  .then( _ => {
    return { tipo: "sucesso", corpo: "Usuario alterado com sucesso!" }
  })
  .catch(erro => {
    return { tipo: "erro", corpo: "Erro: " + erro }
  })
}

/**
 * Seleciona um usuario
 * @param {int} id  ID do usuario que será selecionado
 * @returns {object} Objeto com o usuario selecionado
 */
 function selectUser(id){
  return db.select('*').from('users').where('id', id).first()
  .then(user => { return user })
  .catch(erro => {
    return { tipo: "erro", corpo: "Erro: " + erro }
  })
}

/**
 * Função que exclui um usuario do banco de dados
 * @param {int} id ID do usuario
 */
 function remove(id){
  return db.del().from('users').where('id', id)
}

module.exports =
{
  selectUsers,
  save,
  selectUser,
  edit,
  remove
}
  