/// CARTÃO PROTEGIDO ---------------------------------------------------------------------------
const respCP = document.getElementById("respostaCartaoProtegido");

function criarTokenRef() {
  fetch("https://cartaoprotegidoapisandbox.braspag.com.br/v1/Token", {
      method:"Post", 
      headers: {
                  "Content-Type": "application/json",
                  "MerchantId": "DA12397C-A214-4D2C-BD8F-653F2AFC4538",
                  "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImJWS0RGb1dIRTVha0szeXNqSjJScGpxZFZlRSJ9.eyJjbGllbnRfbmFtZSI6ImRhMTIzOTdjLWEyMTQtNGQyYy1iZDhmLTY1M2YyYWZjNDUzOCBDUCIsImNsaWVudF9pZCI6Ijc0NTk5NzA0LTY5MTgtNGJiNC1iMzE3LTg3NjE0MzAwOWExNSIsInNjb3BlcyI6IntcIlNjb3BlXCI6XCJDYXJ0YW9Qcm90ZWdpZG9BcGlcIixcIkNsYWltc1wiOlt7XCJOYW1lXCI6XCJNZXJjaGFudElkXCIsXCJWYWx1ZXNcIjpbXCJkYTEyMzk3Yy1hMjE0LTRkMmMtYmQ4Zi02NTNmMmFmYzQ1MzhcIl19XX0iLCJyb2xlIjoiQ2FydGFvUHJvdGVnaWRvQXBpIiwiaXNzIjoiaHR0cHM6Ly9hdXRoc2FuZGJveC5icmFzcGFnLmNvbS5iciIsImF1ZCI6IlVWUXhjVUEyY1NKMWZrUTNJVUVuT2lJM2RtOXRmbWw1ZWxCNUpVVXVRV2c9IiwiZXhwIjoxNzYyNTU5MzkyLCJuYmYiOjE3NjI0NzI5OTJ9.JIM0YAAEoiA_wMztfrgfrJKmctUBgxKlnmbE7wNcNumZlVUdYAeVxN4Gu7iCuYE2PhBodjAaBzK4cCQlIXoao-Go-4RvMieBeX9hW1jZcV0unQQ4t4LmrEtUxLz4MI9jMZ8tVZgDhAarr6loBHlddhBfsrE3uEUbH91u3j456NeHOrfnT_yM9hUv5tFGo-KhWPIXHHfAL0gWhE5xr7OmWz-BZVcLrpEj4YTugutia75knn7pam2xZ19rK1YZgLUjUF0sAFQk9KboJwslBoElfOATH6SS9NLY1XxJR0bjzVn6sviduZflz8_b9Fm0IaY74wBTikxhdQWs5WZpCFfchQ",
                  "Access-Control-Allow-Origin": "*"
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
function limparCP() {
  document.getElementById("formCofreId").reset();
  respCP.innerHTML = null;
  respCP.style.display = "none";
  document.getElementById("tokenAlias").focus();
}