import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const create = (newPhoneNumber) => {
    return axios.post(baseUrl, newPhoneNumber).then(response => response.data)
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const update = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data)
}

const phonebookService = { create, delete: deletePerson, update }

export default phonebookService