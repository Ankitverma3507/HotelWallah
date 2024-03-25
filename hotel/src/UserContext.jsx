import { createContext, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

export const UserContext= createContext();

export function UserContextProvider({children}){
    const [user, setUser] = useState(null);
    useEffect( ()=>{
        // const user = localStorage.getItem('user');
        if(!user){
            const {data}= axios.get('/profile').then(({data})=>{
                setUser(data);
            });
            // setUser(data);
        }
    },[]);
    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}