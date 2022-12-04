import axios from 'axios';

export const authenticateUser = async (email, password) => {
    try{
        const response = await axios.post(process.env.REACT_APP_LOGIN, {
            email: email,
            password: password
        })
        if (response.status === 201) {
            const token = response.data.token
            localStorage.setItem('token', token)
            const user = response.data.user
            localStorage.setItem('user', JSON.stringify(user))
            return true
        } else {
            return false
        }
    }catch(e){
        return false;
    }
}

export const getStoredUser = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user;
}

export const getActiveToken = () =>{
    const token = localStorage.getItem('token')
    return token;
}