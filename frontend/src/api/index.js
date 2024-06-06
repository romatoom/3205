import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

const API = {
  findItems: ({ item }) => axios.post(`${API_URL}/items/find`, { item })
}

export default API
