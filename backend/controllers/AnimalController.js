const Animal = require('../models/Animal');
const Person = require('../models/Person');
const { UniqueConstraintError, EmptyResultError, ForeignKeyConstraintError} = require('sequelize');
module.exports = {
	async index(req, res){
		try{
 			const animal = await Animal.findAll({include: [{association: "pessoa", attributes: ["id","name"]}], attributes: {exclude: ['createdAt', 'updatedAt']}});
 			return res.send(animal)
		} 
		catch(err){
			return res.status(400).send({error: "Error on indexing animal"})
		}
 	},
	async store(req, res){
		try{
			const fk_id_pessoa = req.params.id_pessoa;
			const {	id_fazenda, nome, raca, sexo, dt_nascimento } = req.body;
			const person = await Person.findByPk(fk_id_pessoa);
			if(person == null) throw new ForeignKeyConstraintError();
 			const animal = await Animal.create({ fk_id_pessoa, id_fazenda, nome, raca, sexo, dt_nascimento })
 			return res.status(201).send(animal);
 		}
		catch(err){
			if (err instanceof ForeignKeyConstraintError){
				return res.status(404).send({error: "Error on indexing animal: Foreign Key ID pessoa not found"})
			}
			return res.status(400).send({error: "Error on creating animal"});
		}
 	},
 	async show(req, res){
 		try{
	 		const animalId = req.params.id;
	 		const animal = await Animal.findByPk(animalId);
	 		if(animal == null) throw new EmptyResultError();
	 		return res.send(animal);
 		}
 		catch(err){
 			if(err instanceof EmptyResultError){
				return res.status(404).send({error: "Error on showing animal: ID not found"});
 			}
			return res.status(400).send({error: "Error on showing animal"});
 		}
 	},
 	async update(req, res){
 		try{
 			const animalNew = req.body;
	 		const animalId = req.params.id;
	 		const animal = await Animal.findByPk(animalId);
	 		if(animal == null) throw new EmptyResultError();

	 		const { fk_id_pessoa } = animalNew;
	 		 
	 		const person = await Person.findByPk(fk_id_pessoa);
	 		if(person == null) throw new ForeignKeyConstraintError();
	 		const animalUpdated = await animal.update(animalNew);
	 		return res.send(animalUpdated);
 		}
 		catch(err){
 			if (err instanceof ForeignKeyConstraintError){
 				return res.status(404).send({error: "Error on updating animal: Foreign Key ID pessoa not found"})
 			}
 			if(err instanceof EmptyResultError){
				return res.status(404).send({error: "Error on updating animal: ID not found"});
 			}
			return res.status(400).send({error: "Error on updating animal"});
 		}
 	},
 	async delete(req, res){
 		try{
	 		const animalId = req.params.id;
	 		const animal = await Animal.findByPk(animalId);
	 		if(animal == null) throw new EmptyResultError();
	 		const animalDeleted = await animal.destroy();
	 		return res.send(animalDeleted);
 		}
 		catch(err){
 			if(err instanceof EmptyResultError){
				return res.status(404).send({error: "Error on deleting animal: ID not found"});
 			}
			return res.status(400).send({error: "Error on deleting animal"});
 		}
 	}
}