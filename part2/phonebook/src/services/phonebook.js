import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newPhoneNumber) => {
    return axios.post(baseUrl, newPhoneNumber).then(response => response.data)
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const update = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data)
}

const phonebookService = { getAll, create, delete: deletePerson, update }

export default phonebookService