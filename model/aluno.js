//////tipo de dados///////
//////////////exportando////////////
var conexao = require('./conexao')
////////////////////////////////////

var AlunoSchema = new conexao.Schema({
    nome:{
        type:String
    },
    endereco:{
        type:String
    },
    cell:{
        type:String
    }
})

module.exports = conexao.model('aluno', AlunoSchema)
