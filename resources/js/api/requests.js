import axios from 'axios'

export default {
    async getAllDocuments() {
        const response = await axios.get('/api/documents')
        return response
    },
    async createDocument(form) {
        await axios.post('/api/documents/create', form)
    },
    async getDocument(id) {
        const response = await axios.get(`/api/document/${id}`)
        return response
    },
}