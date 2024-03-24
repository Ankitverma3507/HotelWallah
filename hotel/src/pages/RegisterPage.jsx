import { Link } from 'react-router-dom';


export default function RegisterPage(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function registeruser(ev){
        }
    return  (
        <div className="mt-[20%] max-w-[65%] mx-auto my-auto text-gray-500">
            <h1 className="text-3xl font-bold">Register</h1>
            <br />
            <form className="flex flex-col max-w-[65%] mx-auto my-auto " onSubmit={registeruser}>
            <label htmlFor="text">Name</label>
                <input className="border border-gray-400 rounded-lg" type="text" id="text" name="text" value={name} onChange={ev=>setName(ev.target.value)}/>
            <br />
                <label htmlFor="email">Email</label>
                <input className="border border-gray-400 rounded-lg" type="email" id="email" name="email" value={email} onChange={ev=>setEmail(ev.target.value)}/>
            <br />

                <label htmlFor="password">Password</label>
                <input className="border border-gray-400 rounded-lg" type="password" id="password" name="password" value={password} onChange={ev=> setPassword(ev.target.value)} />
            <br />

                <button className="border bg-black text-white rounded-full mt-2 py-1" type="submit">Register</button>

                <div className='text-center'>
                    Already a member? <Link className='underline text-black' to={'/login'}>Login</Link>
                </div>
            </form>
        </div>
    )
}