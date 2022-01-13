$(document).ready(function () {
    $("#formuser").validate({
      rules: {
        email: {
          email: true,
          maxlength: 64
        },
        password: {
          maxlength: 30
        }
      },
      messages: {
        email: {
          required: "Esse campo não pode ser vazio",
          email: "Digite um email válido",
          maxlength: "O email ultrapassou o limite de tamanho permitido no site"
        },

        password: {
            required: "Esse campo não pode ser vazio",
            maxlength: "A senha ultrapassou o limite de tamanho permitido no site"
          }
      }
    });
  })