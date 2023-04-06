import { BASE_URL } from "./config.js";

const handlePerson = {
    create: async(animaisLotes) => {
        return await fetch(`${BASE_URL}/animaisLotes/create`, {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(animaisLotes),
          })
          .then(response => response.json())
          .catch(err => err);
    },
    update: async(animaisLotes) => {
        const { id } = animaisLotes;
        return await fetch(`${BASE_URL}/animaisLotes/${id}`, {
            method: "PUT",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(animaisLotes),
          })
          .then(response => response.json())
          .catch(err => err);
    },
    delete: async(animaisLotes) => {
        const { id } = animaisLotes;
        return await fetch(`${BASE_URL}/animaisLotes/${id}`, {
            method: "DELETE",
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          .then(response => response.json())
          .catch(err => err);
    },
    index: async() => {
        return await fetch(`${BASE_URL}/animaisLotes/`, {
            method: "GET",
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          .then(response => response.json())
          .catch(err => err);
    }
}

export default handlePerson;