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

export const userSignUp = async (userObject) =>{
    try{
        const response = await axios.post(process.env.REACT_APP_USERS, userObject);
        if(response.status === 200){
            return {
                status: "success",
                user: response.data
            }
        }
    }catch(e){
        console.log(e);
        return {
            status: "failure",
            error: e.response.data.error
        }
    }
}