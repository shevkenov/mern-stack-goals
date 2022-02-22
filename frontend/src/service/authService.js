import axios from 'axios';

const baseURL = "/api/users/"

const register = async(userData) => {
    const response = await axios.post(baseURL, userData);

    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
}

const apiService = {
    register
}

export default apiService;