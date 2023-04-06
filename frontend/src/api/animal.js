import { BASE_URL } from "./config.js";

const handlePerson = {
    create: async(animal, id_person) => {
        return await fetch(`${BASE_URL}/animal/create/${id_person}`, {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(animal),
          })
          .then(response => response.json())
          .catch(err => err);
    },
    update: async(animal) => {
        const { id } = animal;
        return await fetch(`${BASE_URL}/animal/${id}`, {
            method: "PUT",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(animal),
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

export default handlePerson;