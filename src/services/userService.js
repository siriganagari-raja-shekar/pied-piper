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

export const getCities = async ()=>{
    try {
        const response = await axios.get(process.env.REACT_APP_USERS+"/cities")
        return response.data
    } catch (e) {
        console.log(e)
        return false
    }
}

export const getDoctor = async (city)=>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_USERS}doctors?city=${city}`)
        return response.data
    } catch (e) {
        console.log(e)
        return false
    }
}

export const getUserFromLocalStorage = () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        return user;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

export const updateUser = async (user) =>{
    try{
        const response = await axios.put(`${process.env.REACT_APP_USERS}/${user.id}`,user);
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
    }
    catch(e){
        console.log(e);
        return undefined;
    }
}