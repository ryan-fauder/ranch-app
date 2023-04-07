import { BASE_URL } from "./config.js";

const handleAnimaisLotes = {
    create: async(animaisLotes) => {
        const { id, lote, animal, ...data} = animaisLotes;
        return await fetch(`${BASE_URL}/animaisLotes/create`, {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(data),
          })
          .then(response => response.json())
          .catch(err => err);
    },
    update: async(animaisLotes) => {
        const { id, lote, animal, ...data} = animaisLotes;
        return await fetch(`${BASE_URL}/animaisLotes/${id}`, {
            method: "PUT",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(data),
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

export default handleAnimaisLotes;