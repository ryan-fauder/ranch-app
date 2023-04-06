import { BASE_URL } from "./config.js";

const handleAnimal = {
    create: async(animal) => {
        const { fk_id_pessoa } = animal;
        return await fetch(`${BASE_URL}/animal/create/${fk_id_pessoa}`, {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(animal),
          })
          .then(response => response.json())
          .catch(err => err);
    },
    update: async(animal) => {
        const { id, pessoa, ...data } = animal;
        console.log(data, pessoa);
        return await fetch(`${BASE_URL}/animal/${id}`, {
            method: "PUT",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(data),
          })
          .then(response => response.json())
          .catch(err => err);
    },
    delete: async(animal) => {
        const { id } = animal;
        return await fetch(`${BASE_URL}/animal/${id}`, {
            method: "DELETE",
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          .then(response => response.json())
          .catch(err => err);
    },
    index: async() => {
        return await fetch(`${BASE_URL}/animal/`, {
            method: "GET",
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          .then(response => response.json())
          .catch(err => err);
    }
}

export default handleAnimal;