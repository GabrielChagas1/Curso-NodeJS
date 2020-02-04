const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.send('Página Inicial do painel ADM');
});

router.get('/posts', (req, res) =>{
    res.send('Página de Posts');
});

router.get('/categorias', (req, res) =>{
    res.send('Cadastrar categorias');
});



module.exports = router;