/// CARTÃO PROTEGIDO ---------------------------------------------------------------------------
const respCP = document.getElementById("respostaCartaoProtegido");

function criarTokenRef() {
  fetch("https://cartaoprotegidoapisandbox.braspag.com.br/v1/Token", {
      method:"Post", 
      headers: {
                  "Content-Type": "application/json",
                  "MerchantId": "DA12397C-A214-4D2C-BD8F-653F2AFC4538",
                  "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImJWS0RGb1dIRTVha0szeXNqSjJScGpxZFZlRSJ9.eyJjbGllbnRfbmFtZSI6ImRhMTIzOTdjLWEyMTQtNGQyYy1iZDhmLTY1M2YyYWZjNDUzOCBDUCIsImNsaWVudF9pZCI6Ijc0NTk5NzA0LTY5MTgtNGJiNC1iMzE3LTg3NjE0MzAwOWExNSIsInNjb3BlcyI6IntcIlNjb3BlXCI6XCJDYXJ0YW9Qcm90ZWdpZG9BcGlcIixcIkNsYWltc1wiOlt7XCJOYW1lXCI6XCJNZXJjaGFudElkXCIsXCJWYWx1ZXNcIjpbXCJkYTEyMzk3Yy1hMjE0LTRkMmMtYmQ4Zi02NTNmMmFmYzQ1MzhcIl19XX0iLCJyb2xlIjoiQ2FydGFvUHJvdGVnaWRvQXBpIiwiaXNzIjoiaHR0cHM6Ly9hdXRoc2FuZGJveC5icmFzcGFnLmNvbS5iciIsImF1ZCI6IlVWUXhjVUEyY1NKMWZrUTNJVUVuT2lJM2RtOXRmbWw1ZWxCNUpVVXVRV2c9IiwiZXhwIjoxNzYyNjQ1NTUxLCJuYmYiOjE3NjI1NTkxNTF9.idRrcCXx1gALgdBCIIljzhcz27JCrCDfEEmebAmTkL1GoJxLCTlEwdgB4IdtnEE3J2G-QFV1jDUT7zoKpt3RxO-ggJpxa6kQoeJbpa0EqDToMqXU-VR-8Y5JaKeDtz_--XbTpoJ3G16eSUlqIbOR26-kBuvSxcki4brxM-qLtCVnUXrzjOerZmHA2SLFqdy-3LTiD9z6nt3ego-jiEUuFKEq_30WPDTuFHz_RtMwsVF7vNJ3rSiDt59nCvG_Q912hJnEK6PPdM-prT2qb6SwrroHzDKYl32DKD18N5ZD0d_O4im-O3v68hTdO1MUZcDUqBqH2etONNhp_7N8PSqQTw"
                },
      body: JSON.stringify({
        "Alias": "Teste002",
        "Card": {
            "Number": "5200000000002151",
            "Holder": "Holder Teste",
            "ExpirationDate": "12/2050",
            "SecurityCode": "321"
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
    }
    else {
      respCP.innerHTML = null;
      respCP.innerHTML +=
        `<strong>Alias/Cartão:</strong> ${data4.Alias} <br><br>
        <strong>CardToken:</strong> ${data4.TokenReference} <br>`

      respCP.style.display = "block";
      window.scrollTo(0, document.body.scrollHeight);
      console.log(data4);
    }
  })
  .catch(error => {
    respCP.style.display = "block";
    respCP.innerHTML += "Ocorreu um erro ao realizar sua solicitação:" + "\n"+"\n" +error.message;
  })
}
function consultarCardToken() {// Consulta com Alias ou Token
  if (document.getElementById("tokenAlias").value != "") {
    // let refToken = document.getElementById("tokenAlias").value;
    fetch("https://cartaoprotegidoapisandbox.braspag.com.br/v1/Alias/_Teste001_/TokenReference", {
        method:"GET",
        headers: {
                  "Content-Type": "application/json",
                  "MerchantId": "DA12397C-A214-4D2C-BD8F-653F2AFC4538",
                  "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImJWS0RGb1dIRTVha0szeXNqSjJScGpxZFZlRSJ9.eyJjbGllbnRfbmFtZSI6ImRhMTIzOTdjLWEyMTQtNGQyYy1iZDhmLTY1M2YyYWZjNDUzOCBDUCIsImNsaWVudF9pZCI6Ijc0NTk5NzA0LTY5MTgtNGJiNC1iMzE3LTg3NjE0MzAwOWExNSIsInNjb3BlcyI6IntcIlNjb3BlXCI6XCJDYXJ0YW9Qcm90ZWdpZG9BcGlcIixcIkNsYWltc1wiOlt7XCJOYW1lXCI6XCJNZXJjaGFudElkXCIsXCJWYWx1ZXNcIjpbXCJkYTEyMzk3Yy1hMjE0LTRkMmMtYmQ4Zi02NTNmMmFmYzQ1MzhcIl19XX0iLCJyb2xlIjoiQ2FydGFvUHJvdGVnaWRvQXBpIiwiaXNzIjoiaHR0cHM6Ly9hdXRoc2FuZGJveC5icmFzcGFnLmNvbS5iciIsImF1ZCI6IlVWUXhjVUEyY1NKMWZrUTNJVUVuT2lJM2RtOXRmbWw1ZWxCNUpVVXVRV2c9IiwiZXhwIjoxNzYyNjQ1NTUxLCJuYmYiOjE3NjI1NTkxNTF9.idRrcCXx1gALgdBCIIljzhcz27JCrCDfEEmebAmTkL1GoJxLCTlEwdgB4IdtnEE3J2G-QFV1jDUT7zoKpt3RxO-ggJpxa6kQoeJbpa0EqDToMqXU-VR-8Y5JaKeDtz_--XbTpoJ3G16eSUlqIbOR26-kBuvSxcki4brxM-qLtCVnUXrzjOerZmHA2SLFqdy-3LTiD9z6nt3ego-jiEUuFKEq_30WPDTuFHz_RtMwsVF7vNJ3rSiDt59nCvG_Q912hJnEK6PPdM-prT2qb6SwrroHzDKYl32DKD18N5ZD0d_O4im-O3v68hTdO1MUZcDUqBqH2etONNhp_7N8PSqQTw"
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
      }
      else {
        respCP.innerHTML = null;
        respCP.innerHTML +=
          `<strong>CardToken:</strong> ${data4.TokenReference} <br>`

        respCP.style.display = "block";
        window.scrollTo(0, document.body.scrollHeight);
        console.log(data4);
      }
    })
    .catch(error => {
      respCP.style.display = "block";
      respCP.innerHTML += "Ocorreu um erro ao realizar sua solicitação:" + "\n"+"\n" +error.message;
    })
  }
  else {
    // let refToken = document.getElementById("tokenReference").value;
    fetch("https://cartaoprotegidoapisandbox.braspag.com.br/v1/Token/cfdc759e-8f0e-42c9-a7e2-c6b94a62baf3", {
        method:"GET",
        headers: {
                  "Content-Type": "application/json",
                  "MerchantId": "DA12397C-A214-4D2C-BD8F-653F2AFC4538",
                  "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImJWS0RGb1dIRTVha0szeXNqSjJScGpxZFZlRSJ9.eyJjbGllbnRfbmFtZSI6ImRhMTIzOTdjLWEyMTQtNGQyYy1iZDhmLTY1M2YyYWZjNDUzOCBDUCIsImNsaWVudF9pZCI6Ijc0NTk5NzA0LTY5MTgtNGJiNC1iMzE3LTg3NjE0MzAwOWExNSIsInNjb3BlcyI6IntcIlNjb3BlXCI6XCJDYXJ0YW9Qcm90ZWdpZG9BcGlcIixcIkNsYWltc1wiOlt7XCJOYW1lXCI6XCJNZXJjaGFudElkXCIsXCJWYWx1ZXNcIjpbXCJkYTEyMzk3Yy1hMjE0LTRkMmMtYmQ4Zi02NTNmMmFmYzQ1MzhcIl19XX0iLCJyb2xlIjoiQ2FydGFvUHJvdGVnaWRvQXBpIiwiaXNzIjoiaHR0cHM6Ly9hdXRoc2FuZGJveC5icmFzcGFnLmNvbS5iciIsImF1ZCI6IlVWUXhjVUEyY1NKMWZrUTNJVUVuT2lJM2RtOXRmbWw1ZWxCNUpVVXVRV2c9IiwiZXhwIjoxNzYyNjQ1NTUxLCJuYmYiOjE3NjI1NTkxNTF9.idRrcCXx1gALgdBCIIljzhcz27JCrCDfEEmebAmTkL1GoJxLCTlEwdgB4IdtnEE3J2G-QFV1jDUT7zoKpt3RxO-ggJpxa6kQoeJbpa0EqDToMqXU-VR-8Y5JaKeDtz_--XbTpoJ3G16eSUlqIbOR26-kBuvSxcki4brxM-qLtCVnUXrzjOerZmHA2SLFqdy-3LTiD9z6nt3ego-jiEUuFKEq_30WPDTuFHz_RtMwsVF7vNJ3rSiDt59nCvG_Q912hJnEK6PPdM-prT2qb6SwrroHzDKYl32DKD18N5ZD0d_O4im-O3v68hTdO1MUZcDUqBqH2etONNhp_7N8PSqQTw"
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
      }
      else {
        respCP.innerHTML = null;
        respCP.innerHTML +=
          `<strong>CardToken:</strong> ${data4.TokenReference} <br><br>
          <strong>Status:</strong> ${data4.Status} <br><br>
          <strong>Número do Cartão:</strong> ${data4.Number} <br>
          <strong>Exipração:</strong> ${data4.ExpirationDate} <br>
          <strong>Holder:</strong> ${data4.Holder} <br>`

        document.getElementById("btn-consulta-token").style.display = "block";
        respCP.style.display = "block";
        window.scrollTo(0, document.body.scrollHeight);
        console.log(data4);
      }
    })
    .catch(error => {
      respCP.style.display = "block";
      respCP.innerHTML += "Ocorreu um erro ao realizar sua solicitação:" + "\n"+"\n" +error.message;
    })
  }
}
function limparCP() {
  document.getElementById("formCofreId").reset();
  respCP.innerHTML = null;
  respCP.style.display = "none";
  document.getElementById("tokenAlias").focus();
}