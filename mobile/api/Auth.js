import axios from 'axios';

const API_BASE = 'https://watchlist-crudapi-9855cdafdb36.herokuapp.com/api/v1/auth';

const login = async (email, password) => {
	const response = await axios.post(`${API_BASE}/signin`, { email, password });
	return response.data;
};

const signup = async (email, password) => {
	const response = await axios.post(`${API_BASE}/`, { email, password });
	return response.data;
};

const authService = {
	signup,
	login,
};
export default authService;
