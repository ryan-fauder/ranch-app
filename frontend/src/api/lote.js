import { BASE_URL } from "./config.js";

const handleLote = {
    create: async(lote) => {
        return await fetch(`${BASE_URL}/lote/create`, {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(lote),
          })
          .then(response => response.json())
          .catch(err => err);
    },
    update: async(lote) => {
        const { id } = lote;
        return await fetch(`${BASE_URL}/lote/${id}`, {
            method: "PUT",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(lote),
          })
          .then(response => response.json())
          .catch(err => err);
    },
    delete: async(lote) => {
        const { id } = lote;
        return await fetch(`${BASE_URL}/lote/${id}`, {
            method: "DELETE",
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          .then(response => response.json())
          .catch(err => err);
    },
    index: async() => {
        return await fetch(`${BASE_URL}/lote/`, {
            method: "GET",
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          .then(response => response.json())
          .catch(err => err);
    }
}

export default handleLote;