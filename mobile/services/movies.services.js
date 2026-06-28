import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/movies';

const getAllPrivatePosts = () => {
	return axios.get('/', { headers: authHeaders() });
};
const moviesService = {
	getAllPrivatePosts,
};

export default moviesService;
