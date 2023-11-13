const form = document.getElementById('form-atividade')
const imgAprovado = '<img src="./images/aprovado.png" alt="emoji celebrando" />'
const imgReprovado = '<img src="./images/reprovado.png" alt="emoji decepcionado" />'
const atividades = []
const notas = []
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'
const notaMinima = parseFloat(prompt('digite a nota mínima: '))

// está no escopo global porque a cada 'submit' ela seria resetada e estando no escopo global isso não acontece
let linhas = '' // responsável por acrescentar as linhas, antes quando era inserido um novo valor o antigo era substituído, mas o objetivo é que a proxima linha seja acrescentada

form.addEventListener('submit', function(e){
    e.preventDefault()

    adicionaLinha()
    atualizaTabela()
    atualizaMediaFinal()
})

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade')
    const inputNotaAtividade = document.getElementById('nota-atividade')

    //verificando se a atividade já foi digitada
    if(atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida`)
    }else {
        atividades.push(inputNomeAtividade.value)
        notas.push(parseFloat(inputNotaAtividade.value))

        //alert(`Atividade: ${inputNomeAtividade.value} - Nota: ${inputNotaAtividade.value}`)
        // Adicionando no corpo da tabela os valores de nota e atividade
        
        let linha = '<tr>'
        linha += `<td>${inputNomeAtividade.value}</td>`
        linha += `<td>${inputNotaAtividade.value}</td>`
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado: imgReprovado}</td>`
        linha += '</tr>'

        linhas += linha
    }    

    //limpar o campo depois de adicionar o conteúdo
    inputNomeAtividade.value = ''
    inputNotaAtividade.value = ''
}

function atualizaTabela() {
    // Colocando o conteúdo dentro do corpo da tabela
    const corpoTabela = document.querySelector('tbody')
    corpoTabela.innerHTML = linhas
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal()

    document.getElementById('media-final-valor').innerHTML = mediaFinal
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado
}

function calculaMediaFinal() {
    
    let somaDasNotas = 0

    for(let i=0; i< notas.length; i++) {
        somaDasNotas += notas[i]
    }

    return somaDasNotas/notas.length
}