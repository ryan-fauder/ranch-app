const express = require('express');
const router = express.Router();
const controller = require('../controllers/AnimalController');

router.post('/create/:id_pessoa', controller.store);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = app => app.use("/animal", router)
