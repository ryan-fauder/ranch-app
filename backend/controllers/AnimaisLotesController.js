const AnimaisLotes = require('../models/AnimaisLotes');
const Animal = require('../models/Animal');
const Lote = require('../models/Lote');
const { EmptyResultError, ForeignKeyConstraintError} = require('sequelize');
module.exports = {
	async index(req, res){
		try{
 			const animais_lotes = await AnimaisLotes.findAll();
 			return res.send(animais_lotes)
		} 
		catch(err){
			return res.status(400).send({error: "Error on indexing animais_lotes"})
		}
 	},
	async store(req, res){
		try{
			const animais_lotesNew = req.body;
			const {	fk_id_animal, fk_id_lote } = animais_lotesNew; 
			const animal = await Animal.findByPk(fk_id_animal);
			if(animal == null) throw new ForeignKeyConstraintError({fields: ["fk_id_animal"]});

			const lote = await Lote.findByPk(fk_id_lote);
			if(lote == null) throw new ForeignKeyConstraintError({fields: ["fk_id_lote"]});
 			
 			const animais_lotes = await AnimaisLotes.create(req.body)
 			return res.status(201).send(animais_lotes);
 		}
		catch(err){
			if (err instanceof ForeignKeyConstraintError){
				if(err.fields[0] == "fk_id_lote")
					return res.status(404).send({error: "Error on indexing animais_lotes: Foreign Key ID lote not found"})
				else if(err.fields[0] == "fk_id_animal")
					return res.status(404).send({error: "Error on indexing animais_lotes: Foreign Key ID animal not found"})
			}
			return res.status(400).send({error: "Error on creating animais_lotes"});
		}
 	},
 	async show(req, res){
 		try{
	 		const animais_lotesId = req.params.id;
	 		const animais_lotes = await AnimaisLotes.findByPk(animais_lotesId);
	 		if(animais_lotes == null) throw new EmptyResultError();
	 		return res.send(animais_lotes);
 		}
 		catch(err){
 			if(err instanceof EmptyResultError){
				return res.status(404).send({error: "Error on showing animais_lotes: ID not found"});
 			}
			return res.status(400).send({error: "Error on showing animais_lotes"});
 		}
 	},
 	async update(req, res){
 		try{
 			const animais_lotesNew = req.body;
	 		const animais_lotesId = req.params.id;
	 		const {fk_id_animal, fk_id_lote} = animais_lotesNew;

	 		const animais_lotes = await AnimaisLotes.findByPk(animais_lotesId);
	 		if(animais_lotes == null) throw new EmptyResultError();

	 		const animal = await Animal.findByPk(fk_id_animal);
			if(animal == null) throw new ForeignKeyConstraintError({fields: ["fk_id_animal"]});

			const lote = await Lote.findByPk(fk_id_lote);
			if(lote == null) throw new ForeignKeyConstraintError({fields: ["fk_id_lote"]});

	 		const animais_lotesUpdated = await AnimaisLotes.update(animais_lotesNew);
	 		return res.send(animais_lotesUpdated);
 		}
 		catch(err){
 			if (err instanceof ForeignKeyConstraintError){
 				if(err.fields[0] == "fk_id_lote")
 					return res.status(404).send({error: "Error on updating animais_lotes: Foreign Key ID lote not found"})
 				else if(err.fields[0] == "fk_id_animal")
 					return res.status(404).send({error: "Error on updating animais_lotes: Foreign Key ID animal not found"})
 			}
 			if(err instanceof EmptyResultError){
				return res.status(404).send({error: "Error on updating animais_lotes: ID not found"});
 			}
			return res.status(400).send({error: "Error on updating animais_lotes"});
 		}
 	},
 	async delete(req, res){
 		try{
	 		const animais_lotesId = req.params.id;
	 		const animais_lotes = await AnimaisLotes.findByPk(animais_lotesId);
	 		if(animais_lotes == null) throw new EmptyResultError();
	 		const animais_lotesDeleted = await AnimaisLotes.destroy();
	 		return res.send(animais_lotesDeleted);
 		}
 		catch(err){
 			if(err instanceof EmptyResultError){
				return res.status(404).send({error: "Error on deleting animais_lotes: ID not found"});
 			}
			return res.status(400).send({error: "Error on deleting animais_lotes"});
 		}
 	}
}