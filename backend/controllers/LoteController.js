const Lote = require('../models/Lote');
const Person = require('../models/Person');
const { UniqueConstraintError, EmptyResultError, ForeignKeyConstraintError} = require('sequelize');
module.exports = {
	async index(req, res){
		try{
 			const lote = await Lote.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}});
 			return res.send(lote)
		} 
		catch(err){
			return res.status(400).send({error: "Error on indexing lote"})
		}
 	},
	async store(req, res){
		try{
			const {nome, descricao} = req.body;
 			const lote = await Lote.create({nome, descricao});
 			return res.status(201).send(lote);
 		}
		catch(err){
			return res.status(400).send({error: "Error on creating lote"});
		}
 	},
 	async show(req, res){
 		try{
	 		const loteId = req.params.id;
	 		const lote = await Lote.findByPk(loteId);
	 		if(lote == null) throw new EmptyResultError();
	 		return res.send(lote);
 		}
 		catch(err){
 			if(err instanceof EmptyResultError){
				return res.status(404).send({error: "Error on showing lote: ID not found"});
 			}
			return res.status(400).send({error: "Error on showing lote"});
 		}
 	},
 	async update(req, res){
 		try{
 			const loteNew = req.body;
	 		const loteId = req.params.id;

	 		const lote = await Lote.findByPk(loteId);
	 		if(lote == null) throw new EmptyResultError();
	 		const loteUpdated = await lote.update(loteNew);
	 		return res.send(loteUpdated);
 		}
 		catch(err){
 			if(err instanceof EmptyResultError){
				return res.status(404).send({error: "Error on updating lote: ID not found"});
 			}
			return res.status(400).send({error: "Error on updating lote"});
 		}
 	},
 	async delete(req, res){
 		try{
	 		const loteId = req.params.id;
	 		const lote = await Lote.findByPk(loteId);
	 		if(lote == null) throw new EmptyResultError();
	 		const loteDeleted = await lote.destroy();
	 		return res.send(loteDeleted);
 		}
 		catch(err){
 			if(err instanceof EmptyResultError){
				return res.status(404).send({error: "Error on deleting lote: ID not found"});
 			}
			return res.status(400).send({error: "Error on deleting lote"});
 		}
 	}
}