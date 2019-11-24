import axios from 'axios'

export default () => { // axios instanca
	return axios.create({
		baseURL: 'http://localhost:3000/api',
		withCredentials: false,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	})
}