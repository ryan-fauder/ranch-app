const Pessoa = require('../models/Pessoa');
const { UniqueConstraintError, EmptyResultError, } = require('sequelize');
module.exports = {
	async index(req, res){
		try{
 			const pessoa = await Pessoa.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}});
 			return res.send(pessoa)
		} 
		catch(err){
			return res.status(400).send({error: "Error on indexing pessoa"})
		}
 	},
	async store(req, res){
		try{
			const { nome, email, endereco, sexo, ativo } = req.body;
 			const pessoa = await Pessoa.create({ nome, email, endereco, sexo, ativo })
 			return res.status(201).send(pessoa);
 		}
		catch(err){
			if(err instanceof UniqueConstraintError){
				return res.status(409).send({error: "Error on creating pessoa: E-mail already in use"});
			}
			return res.status(400).send({error: "Error on creating pessoa"});
		}
 	},
 	async show(req, res){
 		try{
	 		const pessoaId = req.params.id;
	 		const pessoa = await Pessoa.findByPk(pessoaId);
	 		if(pessoa == null) throw new EmptyResultError();
	 		return res.send(pessoa);
 		}
 		catch(err){
 			if(err instanceof EmptyResultError){
				return res.status(404).send({error: "Error on showing pessoa: ID not found"});
 			}
			return res.status(400).send({error: "Error on showing pessoa"});
 		}
 	},
 	async update(req, res){
 		try{
 			const { nome, email, endereco, sexo, ativo } = req.body;
	 		const pessoaId = req.params.id;

	 		const pessoa = await Pessoa.findByPk(pessoaId);
	 		if(pessoa == null) throw new EmptyResultError();
	 		const pessoaUpdated = await pessoa.update({ nome, email, endereco, sexo, ativo });
	 		return res.send(pessoaUpdated);
 		}
 		catch(err){
 			if(err instanceof EmptyResultError){
				return res.status(404).send({error: "Error on updating pessoa: ID not found"});
 			}
			return res.status(400).send({error: "Error on updating pessoa"});
 		}
 	},
 	async delete(req, res){
 		try{
	 		const pessoaId = req.params.id;
	 		const pessoa = await Pessoa.findByPk(pessoaId);
	 		if(pessoa == null) throw new EmptyResultError();
	 		const pessoaDeleted = await pessoa.destroy();
	 		return res.send(pessoaDeleted);
 		}
 		catch(err){
 			if(err instanceof EmptyResultError){
				return res.status(404).send({error: "Error on deleting pessoa: ID not found"});
 			}
			return res.status(400).send({error: "Error on deleting pessoa"});
 		}
 	}
}