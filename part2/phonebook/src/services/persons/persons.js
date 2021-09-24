import axios from "axios";

const baseUrl = '/api/persons'

const getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request;
    return response.data;
}

const create = async (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    const response = await request;
    return response.data;
}

const update = async (id, newNumber) => {
    const numberUpdate = { number : newNumber };
    const request = axios.patch(`${baseUrl}/${id}`, numberUpdate)
    const response = await request;
    return response.data;
}

const deletePerson = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    const response = await request;
    return response.data;
}

const exportedService = {
    getAll,
    create,
    update,
    deletePerson
}


export default exportedService