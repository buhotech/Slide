import axios from 'axios'

const URL = 'https://us-central1-project-bc489.cloudfunctions.net/slide/lilchat/'



export default axios.create({
    baseURL: URL,
    })