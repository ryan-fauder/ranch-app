import { BASE_URL } from "./config.js";

const handlePessoa = {
    create: async(pessoa) => {
        return await fetch(`${BASE_URL}/pessoa/create`, {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(pessoa),
          })
          .then(response => response.json())
          .catch(err => err);
    },
    update: async(pessoa) => {
        const { id } = pessoa;
        return await fetch(`${BASE_URL}/pessoa/${id}`, {
            method: "PUT",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(pessoa),
          })
          .then(response => response.json())
          .catch(err => err);
    },
    delete: async(pessoa) => {
        const { id } = pessoa;
        return await fetch(`${BASE_URL}/pessoa/${id}`, {
            method: "DELETE",
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          .then(response => response.json())
          .catch(err => err);
    },
    index: async() => {
        return await fetch(`${BASE_URL}/pessoa/`, {
            method: "GET",
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          .then(response => response.json())
          .catch(err => err);
    }
}

export default handlePessoa;