const maskCep = cep => cep
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2');

const consult = async cep => {
    let info = await getViaCep(cep);
    if (info.error) {
        info = await getRepublicaVirtual(cep);
    }
    return info;
};

const clearCep = () => {
    $("#rua").val("");
    $("#bairro").val("");
    $("#cidade").val("");
    $("#uf").val("");
    $("#ibge").val("");
};

const loading = () => {
    $("#rua").val("...");
    $("#bairro").val("...");
    $("#cidade").val("...");
    $("#uf").val("...");
    $("#ibge").val("...");
}

$('#cep').keyup(e => $('#cep').val(maskCep(e.target.value)));

$('#buscar').click( async e => {
    e.preventDefault();
    let cep = $('#cep').val().replace(/\D/g, '');
    if(cep !== '') {
        $('#error').html('');
        loading();
        let dados = await consult(cep);
        if(!dados.error) {
            $("#rua").val(dados.resp.logradouro);
            $("#bairro").val(dados.resp.bairro);
            $("#cidade").val(dados.resp.localidade ? dados.resp.localidade : dados.resp.cidade);
            $("#uf").val(dados.resp.uf);
            $("#ibge").val(dados.resp.ibge);
        }
        else{
            clearCep();
            $('#error').html('O cep não existe');
        }
    } 
    else {
        $('#error').html('O cep não pode ser em branco');
    }

});