// Criando os objetos dos elementos de texto do formulário
var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");

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
senha.addEventListener('blur', () => {
  const seguranca = validarSenha(senha);
  if (seguranca === 'fraca') {
    senhaHelp.textContent = 'Senha fraca';
    senhaHelp.style.color = 'red';
    passStrengthMeter.value = 10;
  } 
  if (seguranca === 'moderada') {
    senhaHelp.textContent = 'Senha moderada';
    senhaHelp.style.color = 'orange';
    passStrengthMeter.value = 20;
  } 
  if (seguranca === 'forte') {
    senhaHelp.textContent = 'Senha forte';
    senhaHelp.style.color = 'green';
    passStrengthMeter.value = 30;
  }
}
);

// Função para validar o nome
function validarNome(nome) {
  const regexNome = /^[a-zA-Z ]{6,}$/;
  const nomeValido = nome.target.value.trim().match(regexNome);

  if (!nomeValido) {
    nomeHelp.textContent = "O nome deve ter pelo menos 6 caracteres e não pode conter números ou caracteres especiais.";
    nomeHelp.style.color = "red";
  }
  if (nomeValido) {
    nomeHelp.textContent = "";
  }

}

// Função para validar o ano de nascimento
function validarAno(e) {
  const regexAno = /^\s*[0-9]{4}\s*$/;
  const anoValido = e.target.value.trim().match(regexAno);
  const anoInformado = parseInt(e.target.value.trim());

  if (!anoValido) {
    anoHelp.textContent = "Formato de ano inválido.";
    anoHelp.style.color = "red";
  } else if (anoInformado > 2022) {
    anoHelp.textContent = `Ano inválido. O ano não pode ser maior que 2022.`;
    anoHelp.style.color = "red";
  } else if (anoInformado < 1900) {
    anoHelp.textContent = `Ano inválido. O ano não pode ser menor que 1900.`;
    anoHelp.style.color = "red";
  } else {
    anoHelp.textContent = "";
  }
}

// Função para validar o email
function validarEmail(email) {
  const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(br|com|net|org)$/;
  const emailValido = regexEmail.test(email.target.value);

  if (!emailValido) {
    emailHelp.textContent = "Formato de email inválido. Utilize o seguinte formato: nome@exemplo.com";
    emailHelp.style.color = "red";
  } else {
    console.log("Email válido!");
    emailHelp.textContent = "";
  }
}

// Função para validar a senha
function validarSenha(senha) {
  const senhaValida = senha.value;
  const nomeMinusculo = nome.value.toLowerCase();
  const nomeMaiusculo = nome.value.toUpperCase();

  const regexSenhaLetra = /[a-zA-Z]/;
  const regexSenhaNumero = /[0-9]/;
  const regexSenhaEspecial = /[@#%&!+]/;

  console.log("chegou");
  if(senhaValida.includes(nome.value) || senhaValida.includes(nomeMinusculo) || senhaValida.includes(nomeMaiusculo)){
    senhaHelp.textContent = "Senha não pode conter o seu nome";
    senhaHelp.style.color="red";
    console.log("chegou em nome");
  }
  if(senhaValida.includes(senhaValida.includes(ano.value))){
    senhaHelp.textContent = "Senha não pode conter o seu nome ou ano de nascimento.";
    senhaHelp.style.color="red";
    console.log("chegou em ano");
  }
  if(senhaValida.length < 6){
    senhaHelp.textContent = "Senha Inválida. A senha deve ter mais de 6 caracteres";
    senhaHelp.style.color="red";
  }

  else if(senhaValida.length >= 6 && 
    senhaValida.length <= 20 && 
    regexSenhaLetra.test(senhaValida) && 
    regexSenhaNumero.test(senhaValida) && 
    regexSenhaEspecial.test(senhaValida)){
    
    if(senhaValida.length < 8){
      return 'fraca';
    }
    
    if(senhaValida.length >= 8 && senhaValida.length <= 12){
      return 'moderada';
    }
    
    if(senhaValida.length > 12){
      const caracteresEspeciais = (senhaValida.match(/[@#%&!+]/g) || []).length;
      const caracteresNumericas = (senhaValida.match(/[0-9]/g) || []).length;
      const caracteresMaiusculas = (senhaValida.match(/[A-Z]/g) || []).length;
      
      if (caracteresEspeciais > 1 && caracteresNumericas > 1 && caracteresMaiusculas > 1) {
          return 'forte';
      }
    }
  }
}