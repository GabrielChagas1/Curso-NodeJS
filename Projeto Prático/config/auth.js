const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Model de usuário
require('../models/Usuario');
const Usuario = mongoose.model('usuarios');

module.exports = function(passport){
    // lógica para verificar os dados
    passport.use(new localStrategy({usernameField: 'email'}, (email, senha, done) =>{
        Usuario.findOne({email:email}).then((usuario) =>{
            return done(null, false, {message: 'Está conta não existe'});
        });

        // usuário encontrado
        bcrypt.compare(senha, usuario.senha, (erro, batem) =>{
            if(batem){
                return done(null, user);
            }else{
                return done(null, false, {message: 'Senha incorreta'});
            }
        });
    }));

    // salvar dados numa sessão
    passport.serializeUser((usuario, done) =>{
        done(null, usuario.id);
    });

    passport.deserializeUser((id, done) =>{
        User.findById(id, (err, usuario) =>{
            done(err, user);
        });
    })

}