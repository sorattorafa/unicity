'use strict'; 
  
// control and route of product 

const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/simpleuser-controller'); 
const SimpleUser = require('../routes/simpleuser');

// get functions (by id and data)
router.get('/', controller.get);   
router.get('/:id', controller.getById);  

// post, put and delete (create, update and delete)
router.post('/add', controller.post); 
router.put('/:id', controller.put); 
router.delete('/delete/:id', controller.delete);

// Faz login do usuário
router.post('/login', (req, res) => {
  console.log("Tentou fazer login")
  const email = req.body.email;
  const senha = req.body.senha;
  const secret = "secret";

  SimpleUser.findOne({ email: email }, (err, simpleUser) => {
    if(err) return res.status(400).send('Servidor não pôde entender a requisição');
    if(!simpleUser) return res.status(401).json({auth: false, message: 'Usuário não cadastrado', token: null});

    if (senha === simpleUser.senha) {
      var token = jwt.sign({ id: simpleUser._id }, secret, { expiresIn: 14400 });
      return res.status(200).json({ 
        auth: true, 
        token: token,
        user: {
          nome: simpleUser.nome,
          status: simpleUser.status
        }
      }); // Login confirmado
    }
    return res.status(401).json({auth: false, token: null}); // Login incorreto
  });
});

module.exports = router;
