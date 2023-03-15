import { BASE_URL } from "./config.js";

const handlePerson = {
    create: async(person) => {
        return await fetch(`${BASE_URL}/person/create`, {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(person),
          })
          .then(response => response.json())
          .catch(err => err);
    },
    update: async(person) => {
        const { id } = person;
        return await fetch(`${BASE_URL}/person/${id}`, {
            method: "PUT",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(person),
          })
          .then(response => response.json())
          .catch(err => err);
    },
    delete: async(person) => {
        const { id } = person;
        return await fetch(`${BASE_URL}/person/${id}`, {
            method: "DELETE",
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          .then(response => response.json())
          .catch(err => err);
    },
    index: async() => {
        return await fetch(`${BASE_URL}/person/`, {
            method: "GET",
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          .then(response => response.json())
          .catch(err => err);
    }
}

export default handlePerson;