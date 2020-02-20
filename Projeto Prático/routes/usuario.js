const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('../models/Usuario');
const Usuario = mongoose.model('usuarios');

router.get('/registro', (req, res) =>{
    res.render('usuarios/registro');
});

router.post('/registro', (req, res) =>{
    var erros = fieldsVerify(req);

    if(erros.length > 0){
        res.render('usuarios/registro', {erros: erros});
    }else{
        Usuario.findOne({email: req.body.email}).then((usuario) =>{
            if(usuario){
                req.flash('error_msg', 'Email já cadastrado!');
                res.redirect('/usuarios/registro');
            }
            const newUser = new Usuario({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            });

            bcrypt.genSalt(10, (erro, salt) =>{
                bcrypt.hash(newUser.senha, salt, (erro, hash) =>{
                    if(erro){
                        req.flash('error_msg', 'Houve um erro durante o salvamento do usuário');
                        res.redirect('/');
                    }
                    newUser.senha = hash;
                    newUser.save().then(() =>{
                        req.flash('success_error', 'Usuário salvo com sucesso!');
                        res.redirect('/');
                    }).catch((err) =>{
                        req.flash('error_msg', 'Houve um erro durante o salvamento do usuário');
                        res.redirect('/');
                    });
                })
            });


        }).catch((err) =>{
            req.flash('error_msg', 'Houve um erro interno');
            res.redirect('/')
        })
    }
});


// função para verificar se tem erros no campos de usuários
function fieldsVerify(req){
    var erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome Inválido"});
    } 
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email Inválido"});
    } 
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha Inválido"});
    } 

    if(req.body.senha.length < 8){
        erros.push({texto: "Senha com no mínimo 8 caracteres"});
    }

    if(req.body.senha != req.body.senha2){
        erros.push({texto: "Senhas não coincidem, tenta novamente"});
    }

    return erros;
}




module.exports = router;