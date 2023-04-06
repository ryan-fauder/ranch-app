const Person = require('../models/Person');
const { UniqueConstraintError, EmptyResultError, } = require('sequelize');
module.exports = {
	async index(req, res){
		try{
 			const person = await Person.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}});
 			return res.send(person)
		} 
		catch(err){
			return res.status(400).send({error: "Error on indexing person"})
		}
 	},
	async store(req, res){
		try{
			const { name, email, address, gender, active } = req.body;
 			const person = await Person.create({ name, email, address, gender, active })
 			return res.status(201).send(person);
 		}
		catch(err){
			console.log(err)
			if(err instanceof UniqueConstraintError){
				return res.status(409).send({error: "Error on creating person: E-mail already in use"});
			}
			return res.status(400).send({error: "Error on creating person"});
		}
 	},
 	async show(req, res){
 		try{
	 		const personId = req.params.id;
	 		const person = await Person.findByPk(personId);
	 		if(person == null) throw new EmptyResultError();
	 		return res.send(person);
 		}
 		catch(err){
 			if(err instanceof EmptyResultError){
				return res.status(404).send({error: "Error on showing person: ID not found"});
 			}
			return res.status(400).send({error: "Error on showing person"});
 		}
 	},
 	async update(req, res){
 		try{
 			const {name, email, gender, address, active} = req.body;
	 		const personId = req.params.id;

	 		const person = await Person.findByPk(personId);
	 		if(person == null) throw new EmptyResultError();
	 		const personUpdated = await person.update({name, email, gender, address, active});
	 		return res.send(personUpdated);
 		}
 		catch(err){
 			if(err instanceof EmptyResultError){
				return res.status(404).send({error: "Error on updating person: ID not found"});
 			}
			return res.status(400).send({error: "Error on updating person"});
 		}
 	},
 	async delete(req, res){
 		try{
	 		const personId = req.params.id;
	 		const person = await Person.findByPk(personId);
	 		if(person == null) throw new EmptyResultError();
	 		const personDeleted = await person.destroy();
	 		return res.send(personDeleted);
 		}
 		catch(err){
 			if(err instanceof EmptyResultError){
				return res.status(404).send({error: "Error on deleting person: ID not found"});
 			}
			return res.status(400).send({error: "Error on deleting person"});
 		}
 	}
}