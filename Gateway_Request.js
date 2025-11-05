const streetFighter = document.getElementById("charging");

/// CARTÃO PROTEGIDO ---------------------------------------------------------------------------
const respCP = document.getElementById("respostaCartaoProtegido");
const midCP = "DA12397C-A214-4D2C-BD8F-653F2AFC4538";
const cidCP = "74599704-6918-4bb4-b317-876143009a15";
const csecCP = "xf/fqxcPhDuXroBASCDWlJGmU4l/YJrdGsLLXIYet3Y=";
const bearerTokenCP = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImJWS0RGb1dIRTVha0szeXNqSjJScGpxZFZlRSJ9.eyJjbGllbnRfbmFtZSI6ImRhMTIzOTdjLWEyMTQtNGQyYy1iZDhmLTY1M2YyYWZjNDUzOCBDUCIsImNsaWVudF9pZCI6Ijc0NTk5NzA0LTY5MTgtNGJiNC1iMzE3LTg3NjE0MzAwOWExNSIsInNjb3BlcyI6IntcIlNjb3BlXCI6XCJDYXJ0YW9Qcm90ZWdpZG9BcGlcIixcIkNsYWltc1wiOlt7XCJOYW1lXCI6XCJNZXJjaGFudElkXCIsXCJWYWx1ZXNcIjpbXCJkYTEyMzk3Yy1hMjE0LTRkMmMtYmQ4Zi02NTNmMmFmYzQ1MzhcIl19XX0iLCJyb2xlIjoiQ2FydGFvUHJvdGVnaWRvQXBpIiwiaXNzIjoiaHR0cHM6Ly9hdXRoc2FuZGJveC5icmFzcGFnLmNvbS5iciIsImF1ZCI6IlVWUXhjVUEyY1NKMWZrUTNJVUVuT2lJM2RtOXRmbWw1ZWxCNUpVVXVRV2c9IiwiZXhwIjoxNzYyMzg2NDQ3LCJuYmYiOjE3NjIzMDAwNDd9.OcyhNp7m8yYHOFwCfD0fL4KXCM6vKBHd7iZxxf_2ra7JW5lnjMiO2u9llVjj0KdtGCkqxcN-NRbujDwRqudUZdLLRJ8grlCXeJhGXgmPECFbnstZDz4cZyP9WrVtkenp7ndbtlzLNMC9XIuI92EAbv0q9WnpAOS6if0AroL5vgCVxfw7HIOd47Kd-21L3cP61AmCSMQ03opHNiLDrC89Zn8XezoKIWJ9Qd5AuXCOS_9qyKZ8Vot7dx8E3xkOwUUJKPGgXIwmT7xqaWn9Wu2D8ZwnthyLgjqc-MrcuRuQ6n8uHUk77_NVbIFp1aVVBWgG6M6YGKK63mp2P9jnJYyd-g";
// var bearerTokenCP;
var esrValue;

function showDiv(value) {// ------------------ EXIBINDO O FORM ------------------------------- //
  if (value != "none") {
  document.getElementById(value).style.display = "block";
  }
  let exibirDiv = document.getElementsByName("campoExibirCP"); 
  for(let x=0; x < exibirDiv.length; x++) {
    if (exibirDiv[x].id != value){
      exibirDiv[x].style.display = "none";
    }
  };
}
function callTokenCP() {
  let base64CP = btoa(cidCP +":" +csecCP);

  fetch("https://authsandbox.braspag.com.br/oauth2/token",{
    method:"Post",
    headers:{
      "Authorization": "Basic "+base64CP,
      "content-type":"application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({ grant_type:'client_credentials'}).toString()
    
    // body: JSON.stringify({
    //   "grant_type": "client_credentials"
    // })
  })
  .then((response) => {
    if (!response.ok) { badReq = "errr"; console.log(response);}
    return response.json()
  })
  .then((data4) => {
    if (badReq == "errr") {
      respCP.style.display = "block";
      respCP.innerHTML += "Erro: " + "\n"+"\n" +data4[0].Message;
      streetFighter.style.display = "none";
    }
    else {
      bearerTokenCP = data4.access_token;
      setTimeout(() => criarTokenRef(), 1500);
    }
  })
  .catch((error) => {
    respCP.style.display = "block";
    respCP.innerHTML += `Erro: <strong>${error.message}</strong>`;
    streetFighter.style.display = "none";
  })
}
function validarCamposCP() {// Validando preenchimento --> Disparo do botão Criar Token
  if (document.getElementById("cpCard").value.replace(/\D/g, "").length != 16) {
    dialogoAlertError("O <strong>número do cartão</strong> precisa ter <strong>16</strong> dígitos");
    return;
  }
  if (document.getElementById("cpholder").value == "") {
    dialogoAlertError("O <strong>Nome no cartão(Holder)</strong> é obrigatório!");
    return;
  }
  if (document.getElementById("creditCardExpirationMesCP").value.replace(/\D/g, "").length != 2 || document.getElementById("creditCardExpirationAnoCP").value.replace(/\D/g, "").length != 4) {
    dialogoAlertError("Verifique se a <strong>data de expiração</strong> contém 2 dígitos + 4 dígitos");
    return;
  }
  if (document.getElementById("cvvCP").value.length != 3) {
    dialogoAlertError("O código de segurança <strong>CVV</strong> precisa ter <strong>3</strong> dígitos.");
    return;
  }
  criarTokenRef();
}
function criarTokenRef() {
  streetFighter.style.display = "block";
  fetch("https://cartaoprotegidoapisandbox.braspag.com.br/v1/Token", {
      method:"Post", 
      headers: {
                  "Content-Type": "application/json",
                  "MerchantId": midCP,
                  "Authorization": "Bearer " +bearerTokenCP
                },
      body: JSON.stringify({
        "Alias": document.getElementById("tokenAlias").value,
        "Card": {
          "Number": document.getElementById("cpCard").value,
          "Holder": document.getElementById("cpholder").value,
          "ExpirationDate": document.getElementById("creditCardExpirationMesCP").value +"/" +document.getElementById("creditCardExpirationAnoCP").value,
          "SecurityCode": document.getElementById("cvvCP").value
        }
      })
  })
  .then((response) => {
    if (!response.ok) {badReq = "errr"; console.log(response);}
    return response.json()//converte para json
  })
  .then((data4) => {
    if (badReq == "errr") {
      respCP.style.display = "block";
      respCP.innerHTML += 
      `<strong>Erro:</strong> <br>
      Code: ${data4[0].Code} <br>
      Message: ${data4[0].Message}`;
      streetFighter.style.display = "none";
    }
    else {
      respCP.innerHTML = null;
      respCP.innerHTML +=
        `<strong>Alias/Cartão:</strong> ${data4.Alias} <br><br>
        <strong>CardToken:</strong> ${data4.TokenReference} <br>`

      streetFighter.style.display = "none";
      respCP.style.display = "block";
      window.scrollTo(0, document.body.scrollHeight);
      console.log(data4);
    }
  })
  .catch(error => {
    respCP.style.display = "block";
    respCP.innerHTML += "Ocorreu um erro ao realizar sua solicitação:" + "\n"+"\n" +error.message;
    streetFighter.style.display = "none";
  })
}
function validarGetCP() {// Validando preenchimento --> Disparo do botão Consultar Token
  if (document.getElementById("tokenAliasConsulta").value == "" && document.getElementById("tokenReference").value == "") {
    alert("<strong>Alias</strong> ou <strong>CardToken</strong> são obrigatórios");
    return;
  }
  consultarCardToken();
}
function consultarCardToken() {// Consulta com Alias ou Token
  if (document.getElementById("tokenAlias").value != "") {
    streetFighter.style.display = "block";
    let refToken = document.getElementById("tokenAlias").value;
    fetch("https://cartaoprotegidoapisandbox.braspag.com.br/v1/Alias/_"+refToken+"_/TokenReference", {
        method:"GET",
        headers: {
                    "Content-Type": "application/json",
                    "MerchantId": midCP,
                    "Authorization": "Bearer " +bearerTokenCP
                    // "Access-Control-Allow-Origin": "*"
                  }
    })
    .then((response) => {
      if (!response.ok) {badReq = "errr"; console.log(response);}
      return response.json()//converte para json
    })
    .then((data4) => {
      if (badReq == "errr") {
        respCP.style.display = "block";
        respCP.innerHTML += 
        `<strong>Erro:</strong> <br>
        Code: ${data4[0].Code} <br>
        Message: ${data4[0].Message}`;
        streetFighter.style.display = "none";
      }
      else {
        respCP.innerHTML = null;
        respCP.innerHTML +=
          `<strong>CardToken:</strong> ${data4.TokenReference} <br>`

        streetFighter.style.display = "none";
        respCP.style.display = "block";
        window.scrollTo(0, document.body.scrollHeight);
        console.log(data4);
      }
    })
    .catch(error => {
      respCP.style.display = "block";
      respCP.innerHTML += "Ocorreu um erro ao realizar sua solicitação:" + "\n"+"\n" +error.message;
      streetFighter.style.display = "none";
    })
  }
  else {
    let refToken = document.getElementById("tokenReference").value;
    streetFighter.style.display = "block";
    fetch("https://cartaoprotegidoapisandbox.braspag.com.br/v1/Token/" +refToken, {
        method:"GET",
        headers: {
                    "Content-Type": "application/json",
                    "MerchantId": midCP,
                    "Authorization": "Bearer " +bearerTokenCP
                  }
    })
    .then((response) => {
      if (!response.ok) {badReq = "errr"; console.log(response);}
      return response.json()//converte para json
    })
    .then((data4) => {
      if (badReq == "errr") {
        respCP.style.display = "block";
        respCP.innerHTML += 
        `<strong>Erro:</strong> <br>
        Code: ${data4[0].Code} <br>
        Message: ${data4[0].Message}`;
        streetFighter.style.display = "none";
      }
      else {
        respCP.innerHTML = null;
        respCP.innerHTML +=
          `<strong>CardToken:</strong> ${data4.TokenReference} <br><br>
          <strong>Status:</strong> ${data4.Status} <br><br>
          <strong>Número do Cartão:</strong> ${data4.Number} <br>
          <strong>Exipração:</strong> ${data4.ExpirationDate} <br>
          <strong>Holder:</strong> ${data4.Holder} <br>`

        streetFighter.style.display = "none";
        document.getElementById("btn-consulta-token").style.display = "block";
        respCP.style.display = "block";
        window.scrollTo(0, document.body.scrollHeight);
        console.log(data4);
      }
    })
    .catch(error => {
      respCP.style.display = "block";
      respCP.innerHTML += "Ocorreu um erro ao realizar sua solicitação:" + "\n"+"\n" +error.message;
      streetFighter.style.display = "none";
    })
  }
}
function validarESRcp(value) {// Disparo dos botões Excluir, Suspender ou Reativar
  esrValue = value;
  if (document.getElementById("tokenReference").value.length != 36) {
    dialogoAlertError("<strong>CardToken</strong> ausente ou em tamanho incorreto!");
    return;
  }
  if (value == "Excluir") {
    document.getElementById("alertExclusao").style.display = "block";
    document.getElementById("confirmarAcao").style.display = "block";
    return;
  }
  if (value == "Suspender") {
    document.getElementById("confirmarAcao").style.display = "block";
    return;
  }
  else {
    let refToken = document.getElementById("tokenReference").value;
    streetFighter.style.display = "block";
    fetch("https://cartaoprotegidoapisandbox.braspag.com.br/v1/Token/"+refToken+"/unsuspend", {
        method:"GET",
        headers: {
                    "Content-Type": "application/json",
                    "MerchantId": "const mIdCP = '??????????????????????????????????????'",
                    "Authorization": "Bearer " +bearerTokenCP
                  }
    })
    .then((response) => {
      if (!response.ok) {badReq = "errr"; console.log(response);}
      return response.json()//converte para json
    })
    .then((data4) => {
      if (badReq == "errr") {
        respCP.style.display = "block";
        respCP.innerHTML += 
        `<strong>Erro:</strong> <br>
        Code: ${data4[0].Code} <br>
        Message: ${data4[0].Message}`;
        streetFighter.style.display = "none";
      }
      else {
        respCP.innerHTML = null;
        respCP.innerHTML +=
          `<strong>CardToken:</strong> ${data4.TokenReference} <br><br>
          <strong>Status:</strong> ${data4.Status}`

        streetFighter.style.display = "none";
        respCP.style.display = "block";
        window.scrollTo(0, document.body.scrollHeight);
        console.log(data4);
      }
    })
    .catch(error => {
      respCP.style.display = "block";
      respCP.innerHTML += "Ocorreu um erro ao realizar sua solicitação:" + "\n"+"\n" +error.message;
      streetFighter.style.display = "none";
    })
  }
}
function esrCP() {// Disparo da caixa de confirmação
  document.getElementById("confirmarAcao").style.display = "none";
  let refToken = document.getElementById("tokenReference").value;
  streetFighter.style.display = "block";

  if (esrValue == "Excluir") {
    fetch("https://cartaoprotegidoapisandbox.braspag.com.br/v1/Token/"+refToken, {
      method:"DELETE",
      headers: {
                  "Content-Type": "application/json",
                  "MerchantId": "const mIdCP = '??????????????????????????????????????'",
                  "Authorization": "Bearer " +bearerTokenCP
                },
      body: JSON.stringify({
        "RemovedBy": document.getElementById("removedBytoken").value,
        "Reason": document.getElementById("reasonToken").value
      })
    })
    .then((response) => {
      if (!response.ok) {badReq = "errr"; console.log(response);}
      return response.json()//converte para json
    })
    .then((data4) => {
      if (badReq == "errr") {
        respCP.style.display = "block";
        respCP.innerHTML += 
        `<strong>Erro:</strong> <br>
        Code: ${data4[0].Code} <br>
        Message: ${data4[0].Message}`;
        streetFighter.style.display = "none";
      }
      else {
        respCP.innerHTML = null;
        respCP.innerHTML +=
          `<strong>CardToken:</strong> ${data4.TokenReference} <br><br>
          <strong>Status:</strong> ${data4.Status}`

        streetFighter.style.display = "none";
        respCP.style.display = "block";
        window.scrollTo(0, document.body.scrollHeight);
        console.log(data4);
      }
    })
    .catch(error => {
      respCP.style.display = "block";
      respCP.innerHTML += "Ocorreu um erro ao realizar sua solicitação:" + "\n"+"\n" +error.message;
      streetFighter.style.display = "none";
    })
  }
  else {
    if (esrValue == "Suspender") {
      fetch("https://cartaoprotegidoapisandbox.braspag.com.br/v1/Token/"+refToken+"/suspend", {
        method:"GET",
        headers: {
                    "Content-Type": "application/json",
                    "MerchantId": "const mIdCP = '??????????????????????????????????????'",
                    "Authorization": "Bearer " +bearerTokenCP
                  },
        body: JSON.stringify({
          "RemovedBy": document.getElementById("removedBytoken").value,
          "Reason": document.getElementById("reasonToken").value
        })
      })
      .then((response) => {
        if (!response.ok) {badReq = "errr"; console.log(response);}
        return response.json()//converte para json
      })
      .then((data4) => {
        if (badReq == "errr") {
          respCP.style.display = "block";
          respCP.innerHTML += 
          `<strong>Erro:</strong> <br>
          Code: ${data4[0].Code} <br>
          Message: ${data4[0].Message}`;
          streetFighter.style.display = "none";
        }
        else {
          respCP.innerHTML = null;
          respCP.innerHTML +=
            `<strong>CardToken:</strong> ${data4.TokenReference} <br><br>
            <strong>Status:</strong> ${data4.Status}`

          streetFighter.style.display = "none";
          respCP.style.display = "block";
          window.scrollTo(0, document.body.scrollHeight);
          console.log(data4);
        }
      })
      .catch(error => {
        respCP.style.display = "block";
        respCP.innerHTML += "Ocorreu um erro ao realizar sua solicitação:" + "\n"+"\n" +error.message;
        streetFighter.style.display = "none";
      })
    }
  }
}
function fecharCX() {
  document.getElementById("confirmarAcao").style.display = "none";
  document.getElementById("alertExclusao").style.display = "none";
}
function limparCP() {
  document.getElementById("formCofreId").reset();
  respCP.innerHTML = null;
  respCP.style.display = "none";
  document.getElementById("tokenAlias").focus();
}
window.onbeforeunload = function () {window.scrollTo(0,0);};
