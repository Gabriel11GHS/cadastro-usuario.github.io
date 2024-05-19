document.addEventListener("DOMContentLoaded", (event) => {
  // Criando os objetos dos elementos de texto do formulário
  let nome = document.querySelector("#inputName");
  var nomeHelp = document.querySelector("#inputNameHelp");
  var ano = document.querySelector("#inputYear");
  var anoHelp = document.querySelector("#inputYearHelp");
  var email = document.querySelector("#inputEmail");
  var emailHelp = document.querySelector("#inputEmailHelp");
  var senha = document.querySelector("#inputPassword");
  var senhaHelp = document.querySelector("#inputPasswordHelp");
  var submitConfirm = document.querySelector("#inputResult");

  /*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
  nome.addEventListener("focusout", validarNome);
  /*declarando o evento listener para o campos de texto do form.
Uma vez o foco do campo inputYear mude, será chamada a função validarAno*/
  ano.addEventListener("focusout", validarAno);
  /*declarando o evento listener para o campos de texto do form.
Uma vez o foco do campo inputEmail mude, será chamada a função validarEmail*/
  email.addEventListener("focusout", validarEmail);
  /*declarando o evento listener para o campos de texto do form.
Uma vez o foco do campo inputPassword mude, será chamada a função verificarSegurancaSenha*/
  senha.addEventListener("blur", () => {
    const seguranca = validarSenha(senha);
    if (seguranca === "fraca") {
      senhaHelp.textContent = "Senha fraca. Para a senha ser 'forte', ela precisa ter mais de 12 caracteres, além disso utilize mais de 1 caracter especial, número e letra maiúscula. Exemplo: SEnha@@123456";
      senhaHelp.style.color = "red";
      passStrengthMeter.value = 10;
    }
    if (seguranca === "moderada") {
      senhaHelp.textContent = "Senha moderada. Para a senha ser 'forte', ela precisa ter mais de 12 caracteres, além disso utilize mais de 1 caracter especial, número e letra maiúscula. Exemplo: SEnha@@123456";
      senhaHelp.style.color = "orange";
      passStrengthMeter.value = 20;
    }
    if (seguranca === "forte") {
      senhaHelp.textContent = "Senha forte";
      senhaHelp.style.color = "green";
      passStrengthMeter.value = 30;
    }
  });

  // Função para validar o nome
  function validarNome(){
    const nomeInserido = nome;
    const regexNome = /^[a-zA-Z ]{6,}$/;
    const nomeValido = nomeInserido.value.trim().match(regexNome);

    if (!nomeValido) {
      nomeHelp.textContent =
        "O nome deve ter pelo menos 6 caracteres e não pode conter números ou caracteres especiais.";
      nomeHelp.style.color = "red";
      return false;
    }
    if (nomeValido) {
      nomeHelp.textContent = "";
      return true;
    }
  }

  // Função para validar o ano de nascimento
  function validarAno() {

    const anoInserido = ano;
    const regexAno = /^\s*[0-9]{4}\s*$/;
    const anoValido = anoInserido.value.trim().match(regexAno);

    if (!anoValido) {
      anoHelp.textContent = "Formato de ano inválido.";
      anoHelp.style.color = "red";
      return false;
    } else if (anoValido > 2022) {
      anoHelp.textContent = `Ano inválido. O ano não pode ser maior que 2022.`;
      anoHelp.style.color = "red";
      return false;
    } else if (anoValido < 1900) {
      anoHelp.textContent = `Ano inválido. O ano não pode ser menor que 1900.`;
      anoHelp.style.color = "red";
      return false;
    }
    if (anoValido) {
      anoHelp.textContent = "";
      //console.log("Ano válido!");
      return true;
    }
  }

  // Função para validar o email
  function validarEmail() {
    const emailInserido = email;
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(br|com|net|org)$/;
    const emailValido = regexEmail.test(emailInserido.value);

    if (!emailValido) {
      emailHelp.textContent =
        "Formato de email inválido. Utilize o seguinte formato: nome@exemplo.com";
      emailHelp.style.color = "red";
      //console.log("Email inválido!");
      return false;
    } else {
      emailHelp.textContent = "";
      //console.log("Email válido!");
      return true;
    }
  }

  // Função para validar a senha
  function validarSenha() {
    const senhaValida = senha.value;
    const nomeMinusculo = nome.value.toLowerCase();
    const nomeMaiusculo = nome.value.toUpperCase();

    const regexSenhaLetra = /[a-zA-Z]/;
    const regexSenhaNumero = /[0-9]/;
    const regexSenhaEspecial = /[@#%&!+]/;

    //console.log("chegou em senha");
    if (
      senhaValida.includes(nome.value) ||
      senhaValida.includes(nomeMinusculo) ||
      senhaValida.includes(nomeMaiusculo)
    ) {
      senhaHelp.textContent = "Senha não pode conter o seu nome";
      senhaHelp.style.color = "red";
      //console.log("A senha contém o nome");
    }
    if (senhaValida.includes(senhaValida.includes(ano.value))) {
      senhaHelp.textContent =
        "Senha não pode conter o seu nome ou ano de nascimento.";
      senhaHelp.style.color = "red";
      //console.log("A senha contém o ano de nascimento");
    } else if (
       (senhaValida.length >= 6 &&
        senhaValida.length <= 20 &&
        regexSenhaLetra.test(senhaValida) &&
        regexSenhaNumero.test(senhaValida) &&
        regexSenhaEspecial.test(senhaValida)) ||
        senhaValida.length < 6
    ) {
      if (senhaValida.length < 8) {
        //console.log("A senha está fraca!");
        return "fraca";
      }

      if (senhaValida.length >= 8 && senhaValida.length <= 12) {
        //console.log("A senha está moderada!");
        return "moderada";
      }

      if (senhaValida.length > 12) {
        const caracteresEspeciais = (senhaValida.match(/[@#%&!+]/g) || [])
          .length;
        const caracteresNumericas = (senhaValida.match(/[0-9]/g) || []).length;
        const caracteresMaiusculas = (senhaValida.match(/[A-Z]/g) || []).length;
        
        if (
          caracteresEspeciais > 1 &&
          caracteresNumericas > 1 &&
          caracteresMaiusculas > 1
        ) {
          //console.log("A senha está forte!");
          return "forte";
        }
      }
    }
  }

  // Função para validar o formulário (com tratamento de erros)
  function validarFormulario() {
    console.log("Clicou no botão de submit!");
    //console.log(validarNome());
    //console.log(validarAno());
    //console.log(validarEmail());
    //console.log(validarSenha(senha));

    if (validarNome() &&
        validarAno() &&
        validarEmail() &&
        validarSenha() === "forte") {

      submitConfirm.textContent = "Formulário enviado com sucesso!";
      submitConfirm.style.color = "green";
      //console.log("Formulário enviado");
    } else {
      submitConfirm.textContent = "Por favor, corrija os erros indicados no formulário.";
      submitConfirm.style.color = "red";
      //console.log("Erro no formulário");
    }
  }
  const form = document.querySelector("form");
  form.addEventListener("submit", validarFormulario);
});
