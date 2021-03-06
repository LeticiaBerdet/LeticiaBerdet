//exportando coisas//
const express = require('express')
var app = express()
var bodyparser = require('body-parser')
var Aluno = require('./model/aluno')
var flash = require('req-flash')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var path= require('path')

app.use(cookieParser())
app.use(session({
    secret: '123',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
app.use(express.static(path.join(__dirname,"public")))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.set('view engine','ejs')

///// res = resposta de dados para função e req = solicitação de dados para função/////
app.get('/',function(req,res){
    Aluno.find({}).exec(function(err,docs){
        res.render('listar.ejs', { listaAlunos: docs, msg: req.flash('msg')})
    })

    
})

app.post('/', function(req,res){
    Alunos.find(
        { nome:new RegExp(req.body.pesquisa, 'g')},
        
        function(err,docs){
        res.render('listar.ejs', { listaAlunos: docs, msg:""})
    })
})

app.get('/add',function(req,res){
    res.render('adicionar.ejs',{msg:''})
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
        Aluno.find({}).exec(function(err,docs){
            res.render('listar.ejs',{listaAlunos: docs ,msg:""})

    })
})


app.get('/edit/:id',function(req,res){
    Aluno.findById(req.params.id,function(err,docs){
        res.render('editar.ejs',{aluno:docs})
    })
    
})
app.post('/edit/:id',function(req,res){
    
    Aluno.findByIdAndUpdate(req.body.id,
        {
            nome:req.body.nome,
            endereco:req.body.endereco,
            cell:req.body.cel

        },
        function(err,docs){
            if(err){
                req.flash('msg', 'Problema ao alterar')
                res.redirect('/')
            }else{
                req.flash('msg', 'Alterado com sucesso!')
                res.redirect('/')
        }
        }
    )
})

app.get('/del/:id',function(req,res){
    Aluno.findByIdAndDelete(req.params.id,function(err, docs){
        if(err){ req.flash('msg','Problema ao excluir')
            res.redirect('/')
        }else{
            req.flash('msg', 'Excluido com sucesso!')
            res.redirect('/')
        }
    })
    
})
})
//função anonima//última coisa a por////
app.listen(3000,function(){
    
    console.log("to escutando a porta 3000")
            
})
