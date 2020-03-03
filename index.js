//exportando coisas//
const express = require('express')
var app = express()
var bodyparser = require('body-parser')
var Aluno = require("./model/aluno")

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

app.set('view engine','ejs')

///// res = resposta de dados para função e req = solicitação de dados para função/////
app.get('/',function(req,res){
    res.render('listar.ejs',{})
})

app.get('/add',function(req,res){
    res.render('adicionar.ejs',{})
})
///// post= receber dados de formulário///////
app.post('/add',function(req,res){
    var aluno = new Aluno({
        nome: req.body.nome,
        endereco: req.body.endereco,
        cell: req.body.cell
    })
    aluno.save(function(err){
        //se quiser pesquisar alguem especifico, poe var alunos = Aluno.find({alguem especifico})//////
        Aluno.find({}).exec(function(e,docs){
               

        if(err){
            res.render('listar.ejs',{ msg: err, listaAlunos: docs})

        }else{
            res.render('listar.ejs',{ msg:"Salvo com secesso!", listaAlunos: docs})
            }
        })
    })
})
app.get('/add',function(req,res){
    res.render('editar.ejs',{req})
})

//função anonima//última coisa a por////
app.listen(3000,function(){
    
    console.log("to escutando a porta 3000")
            
})