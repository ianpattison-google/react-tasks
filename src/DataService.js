import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3001';

const getAll = () => {
    return axios.get("/todos");
}

const get = id => {
    return axios.get(`/todos/${id}`);
}

const create = data => {
    return axios.post("/todos", data);
}

const update = (id, data) => {
    return axios.put(`/todos/${id}`, data);
}

const remove = id => {
    return axios.delete(`/todos/${id}`);
}

export default {
    getAll,
    get,
    create,
    update,
    remove
};