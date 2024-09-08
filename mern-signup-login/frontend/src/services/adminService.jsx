import axios from 'axios';

const fetchAdminData = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('/api/admin/dashboard', {
            headers: { Authorization: `Bearer ${token}` } // Ensure the token is being sent
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching admin data', error);
        throw error;
    }
};

export default fetchAdminData;
