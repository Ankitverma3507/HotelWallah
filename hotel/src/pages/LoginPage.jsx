import { Link, Navigate } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import axios from 'axios';
import { useContext,useState } from 'react';
import { UserContext } from '../UserContext';


export default function LoginPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[redirect, setRedirect]= useState(false);
    const {setUser} = useContext(UserContext);

    async function loginUser(ev){
        ev.preventDefault();
        try {
            const {data}= await axios.post('/login', {email,password});
            setUser(data); 
            alert('logged in successfully');
            setRedirect(true);
        } 
        catch (e) {
            alert('Login failed');
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }


    return  (
        <div className="mt-[20%] max-w-[65%] mx-auto my-auto text-gray-500">
            <h1 className="text-3xl font-bold">Login</h1>
            <br />
            <form className="flex flex-col max-w-[65%] mx-auto my-auto" onSubmit={loginUser}>
                <label htmlFor="email">Email</label>
                <input className="border border-gray-400 rounded-lg p-1" type="email" id="email" name="email" 
                    value={email} onChange={ev=>setEmail(ev.target.value)}
                />
            <br />

                <label htmlFor="password">Password</label>
                <input className="border border-gray-400 rounded-lg p-1" type="password" id="password" name="password" 
                value={password} onChange={ev=>setPassword(ev.target.value)}/>
            <br />

                <button className="border bg-black text-white rounded-full mt-2 py-1" type="submit">Login</button>

                <div className='text-center'>
                    Don't have an account? <Link className='underline text-black' to={'/register'}>Register now</Link>
                </div>
            </form>
        </div>
    )
}