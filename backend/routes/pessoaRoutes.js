const express = require('express');
const router = express.Router();
const controller = require('../controllers/PessoaController');

router.post('/create', controller.store);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = app => app.use("/pessoa", router)
