import axios from 'axios';

export const getUser = async (id) => {
    try {
        const response = await axios.get(process.env.REACT_APP_USERS, {
            id: id
        })
        if (response.status === 201) {
           return response.data
        } else {
            return null
        }
    } catch (e) {
        return false
    }
}