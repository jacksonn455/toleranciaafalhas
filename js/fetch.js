const options = {
  method: 'GET',
  headers: {
  'Content-Type': 'application/json'
  }
};

const getViaCep = async cep => {
  let response = {};
  await fetch(`https://viacep.com.br/ws/${cep}/json/`, options)
    .then(resp => resp.json())
    .then(json => {
      response = {resp: json}
      if(json.erro) {
        response['error'] = true;
      }else {
        response['error'] = false;
      }
      response['message'] = 'Busca realizada com VIACEP';
    })
    .catch(e => response = {message: e, error: true});
  return response;
}

const getRepublicaVirtual = async cep => {
  let response = {};
  await fetch(`http://cep.republicavirtual.com.br/web_cep.php?cep=${cep}&formato=json`)
    .then(resp => resp.json())
    .then(json => {
      response = {resp: json}
      if(parseInt(json.resultado) <= 0) {
        response['error'] = true;
      }else {
        response['error'] = false;
      }
      response['message'] = 'Busca realizada com Republica Virtual';
    })
    .catch(e => response = {message: e, error: true});
  return response;
}