import axios from 'axios'

const instance = axios.create({
    baseURL: "https://hn.algolia.com"
})

export default instance