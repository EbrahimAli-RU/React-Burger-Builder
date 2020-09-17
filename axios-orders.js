import axios from 'axios'

const instance = axios.create({
    baseURL = 'https://react-my-burger-84bca.firebaseio.com/'
})

export default instance;